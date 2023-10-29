"use strict";
import { DataTypes } from "sequelize";

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.createTable("Users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        enum: ["admin", "user"],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    queryInterface.createTable("Orders", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerEmailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerCountry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productIds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
    }),
    queryInterface.createTable("BaseProducts", {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "image_path",
      },
      rating: {
        type: DataTypes.STRING,
      },
      minPrice: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      maxPrice: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      description: {
        type: DataTypes.TEXT,
      },
      numberOfClicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    }),
  ]);
}
export function down(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.dropTable("Users"),
    queryInterface.dropTable("Orders"),
    queryInterface.dropTable("BaseProducts"),
  ]);
}
