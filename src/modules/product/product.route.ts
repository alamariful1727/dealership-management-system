import { Router } from "express";
import {
	createProductHandler,
	deleteProductHandler,
	getAllProductsHandler,
	getProductHandler,
	updateProductHandler,
} from "./product.controller";
import validateResource from "./../../middleware/zodValidation";
import {
	createProductValidation,
	deleteProductValidation,
	getProductValidation,
	updateProductValidation,
} from "./product.validation";
const router = Router();

router
	.route("/")
	.post(validateResource(createProductValidation), createProductHandler)
	.get(getAllProductsHandler);

router
	.route("/:id")
	.get(validateResource(getProductValidation), getProductHandler)
	.put(validateResource(updateProductValidation), updateProductHandler)
	.delete(validateResource(deleteProductValidation), deleteProductHandler);

export default router;
