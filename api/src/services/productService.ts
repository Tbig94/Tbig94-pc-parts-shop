import dotenv from "dotenv";
import axios from "axios";
import path from "path";

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

const getData = async () => {
  try {
    const response = await axios.request(options);
    console.log(`productServier - getData() - after response`);

    //return response.data;
    return JSON.parse(JSON.stringify(response.data));
  } catch (err) {
    throw new Error("Sync error");
  }
};

const ProductService = {
  getData,
};

export default ProductService;
