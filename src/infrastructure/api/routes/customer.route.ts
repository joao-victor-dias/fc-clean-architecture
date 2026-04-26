import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import UpdateCustomerUseCase from "../../../usecase/customer/update/update.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Cria um novo cliente
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   number:
 *                     type: number
 *                   zip:
 *                     type: string
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 */
customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Busca um cliente por ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *       500:
 *         description: Erro ao buscar cliente
 */
customerRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());

  try {
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
 * /customer:
 *   get:
 *     summary: Lista todos os clientes
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *           application/xml:
 *             schema:
 *               type: string
 */
customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output)),
  });
});

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   number:
 *                     type: number
 *                   zip:
 *                     type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar cliente
 */
customerRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());

  try {
    const input = {
      id: req.params.id,
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };

    const output = await usecase.execute(input);

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});