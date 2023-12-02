import { user } from "../utils/schema";
import z from "zod";
import { generateSchema } from "@anatine/zod-openapi";
import { FastifySchema } from "fastify";

const registerUser = {
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  response: z.object({
    success: z.literal(true),
    data: z.object({
      user,
    }),
  }),
};

const registerUserSchema: FastifySchema = {
  body: generateSchema(registerUser.body),
  response: {
    200: generateSchema(registerUser.body),
  },
};

const login = {
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: z.object({
    success: z.literal(true),
    data: z.object({
      token: z.string(),
    }),
  }),
};

const loginSchema: FastifySchema = {
  body: generateSchema(login.body),
  response: {
    200: generateSchema(login.body),
  },
};

export default {
  registerUser,
  registerUserSchema,
  login,
  loginSchema,
};
