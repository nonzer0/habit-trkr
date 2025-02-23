import { fastify } from "fastify";
import type { FastifyInstance } from "fastify";
import { fastifyPostgres } from "@fastify/postgres";
import { join } from "path";
import autoLoad from "@fastify/autoload";
// import '@dotenvx/dotenvx/config'

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

console.log("**************", process.env.DATABASE_URL);
app.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL,
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
