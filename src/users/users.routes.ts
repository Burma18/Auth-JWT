import { FastifyInstance } from "fastify";
import usersSchema from "./users.schema";
import usersController from "./users.controller";
import { authenticate } from "../utils/helpers";

export default async function userRoutes(app: FastifyInstance) {
  app.get(
    "/:id",
    {
      preHandler: authenticate,
      schema: usersSchema.getUserSchema,
    },
    usersController.getUser
  );
}
