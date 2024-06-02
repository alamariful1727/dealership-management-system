import config from "config";
import { Pool } from "pg";
import { migrate } from "postgres-migrations";
import path from "path";
import log from "./../utils/logger";
import { IDatabaseConfig } from "./types";

class Database {
	private static instance: Pool;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	public static getInstance(): Pool {
		if (!Database.instance) {
			const poolConfig = config.get<IDatabaseConfig>("db");
			Database.instance = new Pool(poolConfig);
			log.info("PostgreSQL: Pool created successfully.");

			Database.instance.on("error", (err: Error) => {
				log.error(err, "PostgreSQL: Unexpected error on idle client");
				process.exit(-1);
			});
		}

		return Database.instance;
	}

	public static runMigrations = async (): Promise<void> => {
		const client = await Database.getInstance().connect();
		try {
			log.info("PostgreSQL: Client created successfully.");
			await migrate({ client }, path.resolve(__dirname, "migrations/sql"));
			log.info("PostgreSQL: Migration completed.");
		} catch (err) {
			log.error(err, "PostgreSQL: Migration failed");
		} finally {
			client.release();
		}
	};
}

export default Database;
