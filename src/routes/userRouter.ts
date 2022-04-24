import { Router } from "express";
import * as usersController from "../controllers/usersController.js"

const userRouter = Router();

userRouter.post("/signIn", usersController.signIn);
userRouter.post("/signUp", usersController.signUp);

export default userRouter;