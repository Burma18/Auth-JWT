import { buildServer } from "./app";

const server = buildServer();

const startServer = async () => {
  try {
    const address = await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("server running at:", address);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
