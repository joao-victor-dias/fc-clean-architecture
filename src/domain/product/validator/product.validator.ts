import Product from "../entity/product";

export default class ProductValidator {
  validate(entity: Product): void {
    if (entity.name.length === 0) {
      entity.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }

    if (entity.price < 0) {
      entity.notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
    }
  }
}