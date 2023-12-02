import { RouteHandler } from "fastify";
import authSchema from "./auth.schema";
import z from "zod";
import { hashPassword } from "../utils/helpers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser: RouteHandler<{
  Body: z.TypeOf<typeof authSchema.registerUser.body>;
  Reply: z.TypeOf<typeof authSchema.registerUser.response>;
}> = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await req.server.prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    },
  });

  res.code(200).send({
    success: true,
    data: { user },
  });
};

const login: RouteHandler<{
  Body: z.TypeOf<typeof authSchema.login.body>;
  Reply: z.TypeOf<typeof authSchema.login.response>;
}> = async (req, res) => {
  const { email, password } = req.body;

  const user = await req.server.prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const comparePW = bcrypt.compare(password, user?.password!);

  if (!comparePW) {
    throw Error("password mismatch");
  }

  // If valid, generate JWT token
  const token = jwt.sign({ userId: user?.id });

  res.code(200).send({
    success: true,
    data: { token },
  });
};

export default {
  registerUser,
};
