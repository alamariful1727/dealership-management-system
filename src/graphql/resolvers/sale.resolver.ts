import { SalesReportArgs, searchSalesReport } from "../services/sale.service";

const dealershipResolver = {
	Query: {
		async salesReport(_: unknown, args: SalesReportArgs) {
			return await searchSalesReport(args.salesReportSearch);
		},
	},
};

export default dealershipResolver;
