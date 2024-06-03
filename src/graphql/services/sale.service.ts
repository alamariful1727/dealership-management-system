import format from "pg-format";
import Database from "@src/database";
import log from "@src/utils/logger";
import { ICustomer } from "./customer.service";
import { IVehicle } from "./vehicle.service";

export interface ISale {
	id: number;
	vehicle_id: number;
	customer_id: number;
	dealership_id: number;
	sale_date: string;
	sale_price: number;
}

type TSalesReport = Pick<ICustomer, "first_name" | "last_name"> &
	Pick<ISale, "id" | "sale_date" | "sale_price"> &
	Pick<IVehicle, "make" | "model" | "year">;

type TSalesReportParams = Partial<
	Pick<ISale, "vehicle_id" | "customer_id" | "dealership_id"> & {
		limit: number;
		offset: number;
	}
>;

export interface SalesReportArgs {
	salesReportSearch: TSalesReportParams;
}

export const searchSalesReport = async (
	searchParams: SalesReportArgs["salesReportSearch"],
) => {
	try {
		const sql = buildSearchQuery(searchParams);
		if (!sql) {
			return [];
		}
		return await Database.executeQuery<TSalesReport>(sql);
	} catch (err) {
		log.error(err, "Error searching vehicles");
		return [];
	}
};

// Helper function to build the search query
const buildSearchQuery = (
	searchArgs: SalesReportArgs["salesReportSearch"],
): string | null => {
	let baseQuery = `
		SELECT s.id, v.make, v.model, v.year, c.first_name, c.last_name, s.sale_date, s.sale_price
		FROM sales s 
		JOIN vehicles v ON s.vehicle_id = v.id 
		JOIN customers c ON s.customer_id = c.id
	`;

	const conditions: string[] = [];

	// Default limit will be 5
	if (!searchArgs.limit) {
		searchArgs.limit = 5;
	}

	// Default offset will be 0
	if (!searchArgs.offset) {
		searchArgs.offset = 0;
	}

	if (searchArgs.customer_id) {
		conditions.push(format("s.customer_id = %s", searchArgs.customer_id));
	}

	if (searchArgs.vehicle_id) {
		conditions.push(format("s.vehicle_id = %s", searchArgs.vehicle_id));
	}

	if (searchArgs.dealership_id) {
		conditions.push(format("s.dealership_id = %s", searchArgs.dealership_id));
	}

	if (conditions.length > 0) {
		baseQuery += " WHERE " + conditions.join(" AND ");
		baseQuery += " ORDER BY s.sale_date DESC";
		baseQuery += format(
			" LIMIT %L OFFSET %L",
			searchArgs.limit,
			searchArgs.offset,
		);
	} else {
		return null;
	}

	return baseQuery;
};
