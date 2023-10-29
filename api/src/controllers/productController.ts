import { BaseProduct } from "./../models/baseProduct";
import ProductService from "./../services/productService";
import * as productsSample from "./../data/apiResponseSample.json";

const getAllProducts = async (req, res) => {
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

const deleteAllProducts = async (req, res) => {
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

const getMostPopularProducts = async (req, res) => {
  try {
    const products = await BaseProduct.findAll({
      order: [["numberOfClicks", "DESC"]],
      limit: 4,
    });
    console.log(`---PRODUCTS: ${products}`);

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

const updateProduct = async (req, res) => {
  try {
    await BaseProduct.update(
      { numberOfClicks: req.body.numberOfClicks },
      { where: { id: req.body.id } }
    );
  } catch (err) {
    throw new Error(err.stack);
  }
};

const startSync = async (req, res) => {
  try {
    for (const el of productsSample.data) {
      let minPrice;
      let maxPrice;
      let image;
      if (el.typical_price_range) {
        if (el.typical_price_range[0]) {
          minPrice = el.typical_price_range[0].replace(/[^0-9]/g, "");
        }
      }
      if (el.typical_price_range) {
        if (el.typical_price_range[1]) {
          maxPrice = el.typical_price_range[1].replace(/[^0-9]/g, "");
        }
      }
      if (el.product_photos) {
        if (el.product_photos[0]) {
          image = el.product_photos[0];
        }
      }

      if (!(await checkProductResponse(el, minPrice, maxPrice))) {
        continue;
      }

      BaseProduct.create({
        id: el.product_id,
        name: el.product_title || "",
        image,
        rating: el.product_rating || 0.0,
        minPrice,
        maxPrice,
        description: el.product_description || "",
        numberOfClicks: 0,
      });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw new Error(err.stack);
  }
};

async function checkProductResponse(el, minPrice, maxPrice) {
  const existingProduct = await BaseProduct.findOne({
    where: { id: el.product_id },
  });
  if (existingProduct !== null) {
    console.log(`product already exists`);
    return false;
  }
  if (el.product_id == null || minPrice === "" || maxPrice === "") {
    console.log(`skipping product (id: ${el.product_id})`);
    return false;
  }
  return true;
}

const ProductController = {
  getAllProducts,
  deleteAllProducts,
  getMostPopularProducts,
  updateProduct,
  startSync,
};

export default ProductController;
