import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("1", "Product 1", 100);
const product2 = new Product("2", "Product 2", 200);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products).toHaveLength(2);

    expect(output.products).toEqual([
      {
        id: "1",
        name: "Product 1",
        price: 100,
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
      },
    ]);
  });
});