import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import path from "path";
import dealershipResolver from "./resolvers/dealership.resolver";
import vehicleResolver from "./resolvers/vehicle.resolver";
import customerResolver from "./resolvers/customer.resolver";
import saleResolver from "./resolvers/sale.resolver";

const dealershipTypes = readFileSync(
	path.join(__dirname, "./typeDefs/dealership.graphql"),
	{
		encoding: "utf-8",
	},
);

const vehicleTypes = readFileSync(
	path.join(__dirname, "./typeDefs/vehicle.graphql"),
	{
		encoding: "utf-8",
	},
);

const customerTypes = readFileSync(
	path.join(__dirname, "./typeDefs/customer.graphql"),
	{
		encoding: "utf-8",
	},
);

const saleTypes = readFileSync(
	path.join(__dirname, "./typeDefs/sale.graphql"),
	{
		encoding: "utf-8",
	},
);

export const typeDefs = gql(
	`${dealershipTypes} ${vehicleTypes} ${customerTypes} ${saleTypes}`,
);

export const resolvers = {
	Query: {
		...dealershipResolver.Query,
		...vehicleResolver.Query,
		...customerResolver.Query,
		...saleResolver.Query,
	},
	Mutation: {
		...dealershipResolver.Mutation,
		...vehicleResolver.Mutation,
	},
};
