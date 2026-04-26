import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Product 1", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
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

    expect(productRepository.update).toHaveBeenCalled();
  });
});