import { FastifyInstance } from "fastify";
import authSchema from "./auth.schema";
import authController from "./auth..controller";

export default async function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: authSchema.registerUserSchema,
    },
    authController.registerUser
  );
}
