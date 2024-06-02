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
		return (
			(await Database.executeQuery(
				format("select * from dealerships where id = %L", id),
			)) || null
		);
	} catch (err) {
		log.error(err, "Error fetching dealership");
		return null;
	}
};
