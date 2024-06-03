import format from "pg-format";
import Database from "@src/database";
import log from "@src/utils/logger";

export interface IDealership {
	id: number;
	name: string;
	address: string;
	city: string;
	province: string;
	postal_code: string;
	parent_id: number;
}

export type TDealershipInput = Omit<IDealership, "id">;

export interface CreateDealershipArgs {
	dealership: TDealershipInput;
}

export const getDealerships = async () => {
	try {
		return await Database.executeQuery<IDealership>(
			"select * from dealerships",
		);
	} catch (err) {
		log.error(err, "Error fetching dealership");
		return [];
	}
};

export const getDealership = async (id: IDealership["id"]) => {
	try {
		const result = await Database.executeQuery<IDealership>(
			format("select * from dealerships where id = %s", id),
		);
		return result[0] || null;
	} catch (err) {
		log.error(err, "Error fetching dealership");
		return null;
	}
};

export const createDealership = async ({
	name,
	address,
	city,
	province,
	postal_code,
	parent_id,
}: TDealershipInput) => {
	try {
		const result = await Database.executeQuery<IDealership>(
			format(
				"INSERT INTO dealerships (name, address, city, province, postal_code, parent_id) VALUES (%L, %L, %L, %L, %L, %L) RETURNING *",
				name,
				address,
				city,
				province,
				postal_code,
				parent_id,
			),
		);
		return result[0] || null;
	} catch (err) {
		log.error(err, "Error creating dealership");
		return null;
	}
};
