import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    await productRepository.create(new Product("1", "Product 1", 100));

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product Updated",
      price: 200,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: "1",
      name: "Product Updated",
      price: 200,
    });

    const product = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(product.toJSON()).toStrictEqual({
      id: "1",
      name: "Product Updated",
      price: 200,
    });
  });
});