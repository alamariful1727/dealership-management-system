import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateResource = (schema: AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				return res.status(400).send({ errors: e.errors });
			}
			return res.status(400).send("request validation error");
		}
	};
};

export default validateResource;
