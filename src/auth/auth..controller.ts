import { RouteHandler } from "fastify";
import authSchema from "./auth.schema";
import z from "zod";
import { hashPassword } from "../utils/helpers";
import bcrypt from "bcrypt";

const registerUser: RouteHandler<{
  Body: z.TypeOf<typeof authSchema.registerUser.body>;
  Reply: z.TypeOf<typeof authSchema.registerUser.response>;
}> = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(req.body);

    const hashedPassword = await hashPassword(password);

    const user = await req.server.prisma.user2.create({
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
  } catch (error) {
    console.log(error);
  }
};

const login: RouteHandler<{
  Body: z.TypeOf<typeof authSchema.login.body>;
  Reply: z.TypeOf<typeof authSchema.login.response>;
}> = async (req, res) => {
  const { email, password } = req.body;

  const user = await req.server.prisma.user2.findUnique({
    where: {
      email: email,
    },
  });

  const comparePW = await bcrypt.compare(password, user?.password!);

  console.log("comparePW :", comparePW);

  if (!comparePW) {
    throw Error("password mismatch");
  }

  const token = req.server.jwtPlugin.sign({ userId: user?.id });

  console.log("token :", token);

  res.code(200).send({
    success: true,
    data: { token },
  });
};

export default {
  registerUser,
  login,
};
