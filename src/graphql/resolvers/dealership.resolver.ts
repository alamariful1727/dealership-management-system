import {
	IDealership,
	getDealership,
	getDealerships,
} from "../services/dealership.service";

const dealershipResolver = {
	Query: {
		async getDealerships() {
			return await getDealerships();
		},
		async getDealership(_: unknown, args: Pick<IDealership, "id">) {
			return await getDealership(args.id);
		},
	},
};

export default dealershipResolver;
