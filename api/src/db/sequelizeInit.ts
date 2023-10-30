import { Sequelize } from "sequelize-typescript";
import { BaseProduct } from "./../models/baseProduct";
import { Order } from "./../models/order";
import { User } from "./../models/user";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../src/config.env") });
import Roles from "../types/roles";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

export const init = () => {
  sequelize.addModels([BaseProduct]);
  sequelize.addModels([Order]);
  sequelize.addModels([User]);

  sequelize.sync();

  (async () => {
    const admin = User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (!admin) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        role: Roles.Admin,
        password: process.env.ADMIN_PASSWORD,
      });
    }
  })();
};

export const seed = () => {};
