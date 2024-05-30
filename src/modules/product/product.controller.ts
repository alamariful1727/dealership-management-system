import { Request, Response, NextFunction } from "express";
import {
	CreateProductInput,
	DeleteProductInput,
	GetProductInput,
	UpdateProductInput,
} from "@src/modules/product/product.validation";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from "./product.service";

export const createProductHandler = async (
	req: Request<unknown, unknown, CreateProductInput["body"]>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const body = req.body;

		const product = await createProduct(body);

		return res.status(201).json({
			product,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllProductsHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await getAllProducts();

		return res.status(200).json({
			products,
		});
	} catch (error) {
		next(error);
	}
};

export const getProductHandler = async (
	req: Request<GetProductInput["params"]>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const productId = req.params.id;

		const product = await getProduct(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		return res.status(200).json({
			product,
		});
	} catch (error) {
		next(error);
	}
};

export const updateProductHandler = async (
	req: Request<
		UpdateProductInput["params"],
		unknown,
		UpdateProductInput["body"]
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = req.body;
		const productId = req.params.id;

		const product = await updateProduct(productId, data);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		return res.status(200).json({
			message: "Product updated successfully",
			product,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteProductHandler = async (
	req: Request<DeleteProductInput["params"]>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const productId = req.params.id;

		const product = await deleteProduct(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		return res.status(200).json({
			message: "Product removed successfully",
		});
	} catch (error) {
		next(error);
	}
};
