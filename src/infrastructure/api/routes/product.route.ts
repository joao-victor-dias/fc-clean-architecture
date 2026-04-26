import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

export const productRoute = express.Router();

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product 1
 *               price:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 */
productRoute.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());

    const input = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Product 1
 *                       price:
 *                         type: number
 *                         example: 100
 */
productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());

    const output = await usecase.execute({});

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 */
productRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const usecase = new FindProductUseCase(new ProductRepository());

    const output = await usecase.execute({
      id: req.params.id,
    });

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product Updated
 *               price:
 *                 type: number
 *                 example: 200
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
productRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    const usecase = new UpdateProductUseCase(new ProductRepository());

    const input = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});