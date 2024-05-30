import config from "config";
import { Pool } from "pg";
import { migrate } from "postgres-migrations";
import path from "path";
import log from "./../utils/logger";
import { IDatabaseConfig } from "./types";

class Database {
	pool: Pool;

	constructor() {
		const poolConfig = config.get<IDatabaseConfig>("db");
		this.pool = new Pool(poolConfig);
		log.info("PostgreSQL: Pool created successfully.");
	}

	runMigrations = async (): Promise<void> => {
		try {
			const client = await this.pool.connect();
			log.info("PostgreSQL: Client created successfully.");
			await migrate({ client }, path.resolve(__dirname, "migrations/sql"));
			log.info("PostgreSQL: Migration completed.");
		} catch (err) {
			log.error(err, "PostgreSQL: Migration failed");
		}
	};
}

export default Database;
