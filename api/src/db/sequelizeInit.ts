import { Sequelize } from "sequelize-typescript";
import { BaseProduct } from "./../models/baseProduct"; // Import the model you defined
import { Order } from "./../models/order";
import { User } from "./../models/user";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../src/config.env") });

const sequelize = new Sequelize({
  dialect: "postgres", // Specify your database dialect
  database: "pc-parts-shop-db",
  username: "postgres",
  password: "password",
  host: "localhost",
});

export const init = () => {
  sequelize.addModels([BaseProduct]);
  sequelize.addModels([Order]);
  sequelize.addModels([User]);

  sequelize.sync();
  /*
  (async () => {
    const product = await BaseProduct.create({
      name: "Product Name",
      image: "product.jpg",
      // Add other properties here
    });

    // Query the table
    const products = await BaseProduct.findAll();
    console.log(products);
  })();
  */
};

export const seed = () => {
  User.create({
    id: 1,
    email: "admin@email.com",
    role: "admin",
    password: "password",
  });
};
