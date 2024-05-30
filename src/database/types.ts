import { PoolConfig } from "pg";

export type IDatabaseConfig = Pick<
	PoolConfig,
	| "host"
	| "port"
	| "user"
	| "password"
	| "database"
	| "max"
	| "idleTimeoutMillis"
	| "connectionTimeoutMillis"
>;
