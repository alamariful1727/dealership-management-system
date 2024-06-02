import dotenv from "dotenv";
dotenv.config();
import config from "config";
import Database from "@src/database";
import log from "@src/utils/logger";
import startServer from "@src/server";

startServer().then((app) => {
	const PORT = config.get<number>("port");

	app.listen(PORT, () => {
		log.info(`Server is listening at http://localhost:${PORT}`);
		log.info(`GraphQL is listening at http://localhost:${PORT}/graphql`);

		Database.runMigrations();
	});
});
