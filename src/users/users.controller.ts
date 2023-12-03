import { RouteHandler } from "fastify";
import userSchema from "./users.schema";
import z from "zod";
import { hashPassword } from "../utils/helpers";
import bcrypt from "bcrypt";

const getUser: RouteHandler<{
  Params: z.TypeOf<typeof userSchema.getUser.param>;
  Reply: z.TypeOf<typeof userSchema.getUser.response>;
}> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await req.server.prisma.user2.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("no user found");
    }
    res.code(200).send({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUser,
};
