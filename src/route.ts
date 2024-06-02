import { Router } from "express";

const router = Router();

router.get("/health-check", (_, res) => res.sendStatus(200));

export default router;
