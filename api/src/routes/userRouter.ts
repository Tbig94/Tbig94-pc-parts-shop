import { Router } from "express";
import userController from "./../controllers/userController";

const userRouter = Router();
userRouter.route("/login").post(userController.login);
userRouter.route("/signup").post(userController.signup);

export default userRouter;
