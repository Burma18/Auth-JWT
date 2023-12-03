import { user } from "../utils/schema";
import z from "zod";
import { generateSchema } from "@anatine/zod-openapi";
import { FastifySchema } from "fastify";

const getUser = {
  param: z.object({
    id: z.number(),
  }),
  response: z.object({
    success: z.literal(true),
    data: z.object({
      user,
    }),
  }),
};

const getUserSchema: FastifySchema = {
  params: generateSchema(getUser.param),
  response: {
    200: generateSchema(getUser.response),
  },
};

export default {
  getUser,
  getUserSchema,
};
