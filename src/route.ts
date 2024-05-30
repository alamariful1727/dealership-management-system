import { Router } from "express";
import product from "./modules/product/product.route";

const router = Router();

router.use("/products", product);

router.get("/health-check", (_, res) => res.sendStatus(200));

export default router;
