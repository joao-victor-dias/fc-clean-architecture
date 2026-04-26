import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("E2E test for product api", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 100
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      price: 200
    });

    const response = await request(app)
      .get("/product")
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      products: [
        {
          id: "1",
          name: "Product 1",
          price: 100
        },
        {
          id: "2",
          name: "Product 2",
          price: 200
        }
      ]
    });
  });
});