import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WildLife Hub API",
      version: "1.0.0",
      description: "REST API for authentication, membership, and payments in the WildLife Hub application.",
      contact: {
        name: "WildLife Hub Team",
        email: "support@wildlifehub.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
      {
        url: "https://zoo-production.up.railway.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.ts", "./models/*.ts"],
};

export const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    require("swagger-ui-express").serve,
    require("swagger-ui-express").setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "WildLife Hub API Documentation",
    })
  );
};
