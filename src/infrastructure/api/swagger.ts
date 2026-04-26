import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FC Clean Architecture API",
      version: "1.0.0",
      description: "Documentação da API do desafio Full Cycle Clean Architecture",
    },
  },
  apis: ["./src/infrastructure/api/routes/*.ts"],
});