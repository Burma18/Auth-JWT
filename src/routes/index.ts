import { FastifyInstance } from "fastify";
import authRoutes from "../auth/auth.routes";
import userRoutes from "../users/users.routes";

export default async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/" });

  app.register(userRoutes, { prefix: "/users" });
}
