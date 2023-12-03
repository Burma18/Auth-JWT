import jwt from "jsonwebtoken";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

async function jwtPlugin(app: FastifyInstance) {
  console.log("reached jwt plugin");
  const secret = process.env.JWT_SECRET || "fallbacksecret";
  console.log("secret :", secret);

  app.decorate("jwtPlugin", {
    sign(payload: any): string {
      console.log(jwt.sign(payload, secret));
      return jwt.sign(payload, secret);
    },
    verify(token: string): any {
      return jwt.verify(token, secret);
    },
  });
}

export default fp(jwtPlugin);
