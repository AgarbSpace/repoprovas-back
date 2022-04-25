import { Router } from "express";
import * as testsController from "../controllers/testsController.js"
import * as auth from "../middlewares/ensureAuthenticationMiddleware.js";

const testsRouter = Router();

testsRouter.get("/tests",auth.ensureAuthenticationMiddleware ,testsController.getTests);

export default testsRouter;