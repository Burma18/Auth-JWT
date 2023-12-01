import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import prisma from "./plugins/prisma";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export function buildServer() {
  const server: FastifyInstance = fastify();

  server.register(prisma);

  return server;
}
