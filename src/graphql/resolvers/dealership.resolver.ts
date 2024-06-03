import {
	IDealership,
	CreateDealershipArgs,
	createDealership,
	getDealership,
	getDealerships,
} from "../services/dealership.service";

const dealershipResolver = {
	Query: {
		async getAllDealerships() {
			return await getDealerships();
		},
		async getSingleDealership(_: unknown, args: Pick<IDealership, "id">) {
			return await getDealership(args.id);
		},
	},
	Mutation: {
		async createDealership(_: unknown, args: CreateDealershipArgs) {
			return await createDealership(args.dealership);
		},
	},
};

export default dealershipResolver;
