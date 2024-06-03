import {
	CreateVehicleArgs,
	SearchVehiclesArgs,
	UpdateVehicleArgs,
	createVehicle,
	searchVehicles,
	updateVehicle,
} from "../services/vehicle.service";

const dealershipResolver = {
	Query: {
		async searchVehicles(_: unknown, args: SearchVehiclesArgs) {
			return await searchVehicles(args.vehicleSearch);
		},
	},
	Mutation: {
		async createVehicle(_: unknown, args: CreateVehicleArgs) {
			return await createVehicle(args.vehicle);
		},
		async updateVehicle(_: unknown, args: UpdateVehicleArgs) {
			return await updateVehicle(args.vehicle);
		},
	},
};

export default dealershipResolver;
