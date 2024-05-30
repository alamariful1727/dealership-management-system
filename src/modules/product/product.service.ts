import ProductModel from "./product.model";
import { CreateProductInput, UpdateProductInput } from "./product.validation";

export const createProduct = (product: CreateProductInput["body"]) =>
	ProductModel.create(product);

export const getAllProducts = () => ProductModel.find();

export const getProduct = (id: string) => ProductModel.findById(id);

export const updateProduct = (id: string, data: UpdateProductInput["body"]) =>
	ProductModel.findByIdAndUpdate(id, data, {
		// this will return the updated data
		new: true,
	});

export const deleteProduct = (id: string) => ProductModel.findByIdAndDelete(id);
