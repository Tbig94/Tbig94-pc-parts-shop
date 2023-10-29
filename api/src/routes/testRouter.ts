import { Router } from "express";
import testController from "./../controllers/testController";
import UserRoleChecker from "../middlewares/userRoleChecker";
import Roles from "./../types/roles";

const testRouter = Router();

testRouter
  .route("/user")
  .get(UserRoleChecker.checkUserRole(Roles.User), testController.roleTestUser);

testRouter
  .route("/admin")
  .get(
    UserRoleChecker.checkUserRole(Roles.Admin),
    testController.roleTestAdmin
  );

export default testRouter;
