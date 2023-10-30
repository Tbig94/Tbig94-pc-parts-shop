import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import path from "path";
import { BaseProduct } from "../models/baseProduct";

dotenv.config({ path: path.resolve(__dirname, "../../src/config.env") });

const url = process.env.RAPIDAPI_URL;
const keyword = process.env.RAPIAPI_SEARCH_KEYWORD;
const key = process.env.RAPIDAPI_HEADER_KEY;
const host = process.env.RAPIDAPI_HEADER_HOST;

const options = {
  method: "GET",
  url: url,
  params: {
    q: keyword,
    country: "hu",
    language: "en",
  },
  headers: {
    "X-RapidAPI-Key": key,
    "X-RapidAPI-Host": host,
  },
};

type ProductData = {
  product_id: string;
  product_title: string;
  product_description: string;
  product_photos: string[];
  product_attributes: object[];
  product_rating: number;
  product_page_url: string;
  product_offers_page_url: string;
  product_specs_page_url: string;
  product_reviews_page_url: string;
  product_num_reviews: number;
  typical_price_range: number[];
  offer: object[];
};

type FetchProductsResponse = {
  status: string;
  request_id: string;
  data: ProductData[];
};

const fetchProductData = async () => {
  try {
    const response: AxiosResponse = await axios.request<FetchProductsResponse>(
      options
    );

    return response.data;
  } catch (err) {
    throw new Error(`Product sync error: ${err.stack}`);
  }
};

const saveProducts = async (productsResponse: AxiosResponse) => {
  for (const el of productsResponse.data) {
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
};

async function checkProductResponse(el, minPrice, maxPrice) {
  const existingProduct = await BaseProduct.findOne({
    where: { id: el.product_id },
  });
  if (existingProduct !== null) {
    return false;
  }
  if (
    el.product_id == null ||
    minPrice === null ||
    minPrice === undefined ||
    maxPrice === null ||
    maxPrice === undefined
  ) {
    return false;
  }
  return true;
}

const ProductService = {
  fetchProductData,
  saveProducts,
};

export default ProductService;
