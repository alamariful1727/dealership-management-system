import express, {
	Request,
	Response,
	NextFunction,
	json,
	Express,
} from "express";
import config from "config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import routes from "./route";
import log from "./utils/logger";
import resolvers from "./resolvers";

const typeDefs = gql(
	readFileSync("src/schema.graphql", {
		encoding: "utf-8",
	}),
);

const startServer = async (): Promise<Express> => {
	const app = express();

	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	app.use(cors());
	app.use(json());
	app.use(
		helmet({
			crossOriginEmbedderPolicy: false,
			contentSecurityPolicy: {
				directives: {
					imgSrc: [
						"'self'",
						"data:",
						"apollo-server-landing-page.cdn.apollographql.com",
					],
					scriptSrc: ["'self'", "https: 'unsafe-inline'"],
					manifestSrc: [
						"'self'",
						"apollo-server-landing-page.cdn.apollographql.com",
					],
					frameSrc: ["'self'", "sandbox.embed.apollographql.com"],
				},
			},
		}),
	);
	app.use(morgan(config.get<string>("env") == "production" ? "prod" : "dev"));

	app.use("/graphql", expressMiddleware(server));

	app.get("/", (_req, res) => {
		return res.send("Hello, visitor");
	});

	app.use("/api", routes);

	app.use((_req, res) => {
		return res.status(404).json({
			message: "API not found",
		});
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
		if (process.env.NODE_ENV !== "test") {
			log.error(err);
		}
		const type = err?.type;
		const message = err.message || "INTERNAL SERVER ERROR";
		const stack = err?.stack;
		const statusCode = err.status || err.statusCode || 500;

		return res.status(statusCode).json({
			type,
			message,
			stack,
		});
	});

	return app;
};

export default startServer;
