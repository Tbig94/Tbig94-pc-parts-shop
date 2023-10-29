const express = require("express");
import productController from "./../controllers/productController";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAllProducts)
  .delete(productController.deleteAllProducts)
  .put(productController.updateProduct);

productRouter.route("/top").get(productController.getMostPopularProducts);

productRouter.route("/sync").get(productController.startSync);

export default productRouter;
