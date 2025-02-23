import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (app): Promise<void> => {
  app.get("/", async () => {
    return { root: true };
  });
};

export default root;
