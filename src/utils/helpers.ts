import bcrypt from "bcrypt";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

import { RouteHandler } from "fastify";

export const authenticate: RouteHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const { authorization } = req.headers;

  console.log("req.headers :", req.headers);

  // Check if the authorization header exists and has a token
  if (!authorization || !authorization.startsWith("Bearer")) {
    console.log(!authorization || !authorization.startsWith("Bearer "));
    return res.code(401).send({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  console.log("token :", token);

  try {
    // Verify the token using the JWT plugin
    const decodedToken = req.server.jwtPlugin.verify(token);

    console.log("decodedToken: ", decodedToken);

    // Assuming the decodedToken contains the userId
    req.userId = decodedToken.userId;

    console.log("user id :", req.userId);

    next(); // Token is valid, continue to the next middleware or route handler
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return res.code(401).send({ message: "Unauthorized" });
  }
};
