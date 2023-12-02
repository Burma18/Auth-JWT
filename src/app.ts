import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import prisma from "./plugins/prisma";
import routes from "./routes";
import jwt from "fastify-jwt";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    jwt: any;
  }
}

export function buildServer() {
  const server: FastifyInstance = fastify();

  server.register(prisma);

  server.get("/ping", (req, res) => {
    res.send("pong");
  });

  server.register(jwt),
    {
      secret: "thisismysecretkey",
      sign: { expiresIn: "3h" }, // Set token expiration for 3 hours
    };

  server.decorate("jwt", jwt);

  server.register(routes, { prefix: "/api/v1" });

  return server;
}
