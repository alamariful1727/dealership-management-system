import format from "pg-format";
import Database from "@src/database";
import log from "@src/utils/logger";

export interface IVehicle {
	id: number;
	dealership_id: number;
	make: string;
	model: string;
	year: number;
	price: number;
	vin: string;
}

type TVehicleInput = Omit<IVehicle, "id">;

export interface CreateVehicleArgs {
	vehicle: TVehicleInput;
}

type TVehicleUpdateInput = Partial<TVehicleInput> & Pick<IVehicle, "id">;

export interface UpdateVehicleArgs {
	vehicle: TVehicleUpdateInput;
}

type TVehicleSearchParams = Partial<
	Omit<TVehicleInput, "year" | "price"> & {
		yearMin: number;
		yearMax: number;
		priceMin: number;
		priceMax: number;
		limit: number;
		offset: number;
	}
>;

export interface SearchVehiclesArgs {
	vehicleSearch: TVehicleSearchParams;
}

export const createVehicle = async ({
	dealership_id,
	make,
	model,
	year,
	price,
	vin,
}: CreateVehicleArgs["vehicle"]) => {
	try {
		const result = await Database.executeQuery<IVehicle>(
			format(
				"INSERT INTO vehicles (dealership_id, make, model, year, price, vin) VALUES (%L, %L, %L, %L, %L, %L) RETURNING *",
				dealership_id,
				make,
				model,
				year,
				price,
				vin,
			),
		);
		return result[0] || null;
	} catch (err) {
		log.error(err, "Error creating vehicle");
		return null;
	}
};

export const updateVehicle = async ({
	id,
	...updatedFields
}: UpdateVehicleArgs["vehicle"]) => {
	// if updateFields are not provided, return null
	if (Object.entries(updatedFields).length === 0) {
		return null;
	}

	const updateValues = Object.entries(updatedFields).map(([key, value]) =>
		format("%I = %L", key, value),
	);

	const sql = format(
		"UPDATE vehicles SET %s WHERE id = %s RETURNING *",
		updateValues.join(", "),
		id,
	);

	try {
		const result = await Database.executeQuery<IVehicle>(sql);
		return result[0] || null;
	} catch (err) {
		log.error(err, "Error updating vehicle");
		return null;
	}
};

export const searchVehicles = async (
	vehicleSearchParams: TVehicleSearchParams,
) => {
	try {
		const sql = buildSearchQuery(vehicleSearchParams);
		log.info(sql);
		return await Database.executeQuery<IVehicle>(sql);
	} catch (err) {
		log.error(err, "Error searching vehicles");
		return [];
	}
};

// Helper function to build the search query
const buildSearchQuery = (searchArgs: TVehicleSearchParams): string => {
	let baseQuery = "SELECT * FROM vehicles";
	const conditions: string[] = [];

	// Default limit will be 5
	if (!searchArgs.limit) {
		searchArgs.limit = 5;
	}

	// Default offset will be 0
	if (!searchArgs.offset) {
		searchArgs.offset = 0;
	}

	// if minimum year is passed and maximum year is not passed, then maximum year will be counted will be current year
	if (searchArgs.yearMin && !searchArgs.yearMax) {
		searchArgs.yearMax = new Date().getFullYear();
	}

	// if maximum year is passed and minimum year is not passed, then minimum year will be counted will be 1990
	if (!searchArgs.yearMin && searchArgs.yearMax) {
		searchArgs.yearMin = 1990;
	}

	if (searchArgs.dealership_id) {
		conditions.push(format("dealership_id = %s", searchArgs.dealership_id));
	}

	if (searchArgs.make) {
		conditions.push(format("make ILIKE %L", `%${searchArgs.make}%`));
	}

	if (searchArgs.model) {
		conditions.push(format("model ILIKE %L", `%${searchArgs.model}%`));
	}

	if (searchArgs.yearMin && searchArgs.yearMax) {
		conditions.push(
			format("year BETWEEN %L AND %L", searchArgs.yearMin, searchArgs.yearMax),
		);
	}

	if (searchArgs.priceMin && searchArgs.priceMax) {
		conditions.push(
			format(
				"price BETWEEN %L AND %L",
				searchArgs.priceMin,
				searchArgs.priceMax,
			),
		);
	} else if (searchArgs.priceMin) {
		conditions.push(format("price >= %L", searchArgs.priceMin));
	} else if (searchArgs.priceMax) {
		conditions.push(format("price <= %L", searchArgs.priceMax));
	}

	if (searchArgs.vin) {
		conditions.push(format("vin = %L", searchArgs.vin));
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
