import OrderController from "./../controllers/orderController";
import express from "express";

const orderRouter = express.Router();

orderRouter.route("/").post(OrderController.createOrder);

export default orderRouter;
