import ProductInterface from "./product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import ProductValidator from "../validator/product.validator";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();

    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages("product"));
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages("product"));
    }
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages("product"));
    }
  }

  validate(): void {
    new ProductValidator().validate(this);
  }
}