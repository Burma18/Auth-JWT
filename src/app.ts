import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import prisma from "./plugins/prisma";
import routes from "./routes";
import jwtPlugin from "./plugins/jwt";

interface JWTPlugin {
  sign(payload: any): string;
  verify(token: string): any;
}
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    jwtPlugin: JWTPlugin;
  }
}

export function buildServer() {
  const server: FastifyInstance = fastify();

  server.register(prisma);

  server.get("/ping", (req, res) => {
    res.send("pong");
  });

  server.register(jwtPlugin);

  server.register(routes, { prefix: "/api/v1" });

  return server;
}
