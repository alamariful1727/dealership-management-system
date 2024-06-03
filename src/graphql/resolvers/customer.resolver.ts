import {
	SearchCustomersArgs,
	searchCustomers,
} from "../services/customer.service";

const dealershipResolver = {
	Query: {
		async searchCustomers(_: unknown, args: SearchCustomersArgs) {
			return await searchCustomers(args.customerSearch);
		},
	},
};

export default dealershipResolver;
