import { Document, Schema, model } from "mongoose";

interface IProduct {
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			trim: true,
			minlength: 2,
			maxlength: 30,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 100,
			default: "",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const ProductModel = model<IProductModel>("Product", ProductSchema);

export default ProductModel;
