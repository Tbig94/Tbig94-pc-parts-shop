import { BaseProduct } from "./../models/baseProduct";
import ProductService from "./../services/productService";
import { AxiosResponse } from "axios";
import { Request, Response } from "express";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await BaseProduct.findAll();
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    throw new Error(err.stack);
  }
};

const deleteAllProducts = async (req: Request, res: Response) => {
  try {
    await BaseProduct.destroy({
      where: {},
      truncate: true,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw new Error(err.stack);
  }
};

const getMostPopularProducts = async (req: Request, res: Response) => {
  try {
    const products = await BaseProduct.findAll({
      order: [["numberOfClicks", "DESC"]],
      limit: 4,
    });

    if (!products) {
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          products,
        },
      });
    }
  } catch (err) {
    throw new Error(err.stack);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    await BaseProduct.update(
      { numberOfClicks: req.body.numberOfClicks },
      { where: { id: req.body.id } }
    );
  } catch (err) {
    throw new Error(err.stack);
  }
};

const startSync = async (req: Request, res: Response) => {
  try {
    const products: AxiosResponse = await ProductService.fetchProductData();
    await ProductService.saveProducts(products);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw new Error(err.stack);
  }
};

const ProductController = {
  getAllProducts,
  deleteAllProducts,
  getMostPopularProducts,
  updateProduct,
  startSync,
};

export default ProductController;
