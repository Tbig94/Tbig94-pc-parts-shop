import express from "express";
import cors from "cors";
import json from "express";
import productRouter from "./routes/productRouter";
import orderRouter from "./routes/orderRouter";
import userRouter from "./routes/userRouter";
import testRouter from "./routes/testRouter";
import { init, seed } from "./db/sequelizeInit";
import bodyParser from "body-parser";

const app = express();
app.use(json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init();

app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/test", testRouter);

export default app;
