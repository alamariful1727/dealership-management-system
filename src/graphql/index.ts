import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import path from "path";
import dealershipResolver from "./resolvers/dealership.resolver";

const dealershipTypes = readFileSync(
	path.join(__dirname, "./typeDefs/dealership.graphql"),
	{
		encoding: "utf-8",
	},
);

export const typeDefs = gql(`${dealershipTypes}`);

export const resolvers = {
	Query: {
		...dealershipResolver.Query,
	},
	Mutation: {
		...dealershipResolver.Mutation,
	},
};
