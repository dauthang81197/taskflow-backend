import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import fs from "fs";
function autoDetectSwaggerPath() {
  const distPath = path.resolve("dist/modules");
  const srcPath = path.resolve("src/modules");

  if (fs.existsSync(distPath)) {
    return "dist/modules/**/*.routes.js";
  }

  if (fs.existsSync(srcPath)) {
    return "src/modules/**/*.routes.ts";
  }

  // fallback
  return "src/modules/**/*.routes.ts";
}
const apiPath = autoDetectSwaggerPath();
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Task Flow Documentation",
      version: "1.0.0",
      description: "Task Flow API",
    },
    servers: [{ url: "http://localhost:8000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            accessToken: { type: "string" },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        Project: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [apiPath],
};
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at: http://localhost:8000/api-docs");
};
