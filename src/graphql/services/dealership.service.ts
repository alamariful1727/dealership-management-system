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
	const pool = Database.getInstance();
	const client = await pool.connect();

	try {
		const result = await client.query("select * from dealerships");
		log.info(result.rows);

		return result.rows;
	} catch (err) {
		log.error(err);
		return [];
	} finally {
		client.release();
	}
};

export const getDealership = async (id: IDealership["id"]) => {
	const pool = Database.getInstance();
	const client = await pool.connect();

	try {
		const result = await client.query(
			"select * from dealerships where id = $1",
			[id],
		);

		return result.rows[0];
	} catch (err) {
		log.error(err);
		return {};
	} finally {
		client.release();
	}
};
