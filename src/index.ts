import dotenv from "dotenv";
dotenv.config();
import config from "config";
import Database from "@src/database";
import log from "@src/utils/logger";
import createServer from "@src/server";

const PORT = config.get<number>("port");

const app = createServer();
const db = new Database();

app.listen(PORT, () => {
	log.info(`Server is listening at http://localhost:${PORT}`);

	db.runMigrations();
});
