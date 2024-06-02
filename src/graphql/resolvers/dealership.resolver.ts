import {
	IDealership,
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
};

export default dealershipResolver;
