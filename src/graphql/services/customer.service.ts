import format from "pg-format";
import Database from "@src/database";
import log from "@src/utils/logger";

export interface ICustomer {
	id: number;
	dealership_id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
}

type TCustomersSearchParams = Pick<ICustomer, "last_name"> &
	Partial<{
		limit: number;
		offset: number;
	}>;

export interface SearchCustomersArgs {
	customerSearch: TCustomersSearchParams;
}

export const searchCustomers = async (
	customerSearchParams: SearchCustomersArgs["customerSearch"],
) => {
	try {
		const sql = buildSearchQuery(customerSearchParams);
		return await Database.executeQuery<ICustomer>(sql);
	} catch (err) {
		log.error(err, "Error searching vehicles");
		return [];
	}
};

// Helper function to build the search query
const buildSearchQuery = (
	searchArgs: SearchCustomersArgs["customerSearch"],
): string => {
	let baseQuery = "SELECT * FROM customers";
	const conditions: string[] = [];

	// Default limit will be 5
	if (!searchArgs.limit) {
		searchArgs.limit = 5;
	}

	// Default offset will be 0
	if (!searchArgs.offset) {
		searchArgs.offset = 0;
	}

	if (searchArgs.last_name) {
		conditions.push(format("last_name ILIKE %L", `${searchArgs.last_name}%`));
	}

	if (conditions.length > 0) {
		baseQuery += " WHERE " + conditions.join(" AND ");
	}

	baseQuery += format(
		" LIMIT %L OFFSET %L",
		searchArgs.limit,
		searchArgs.offset,
	);

	return baseQuery;
};
