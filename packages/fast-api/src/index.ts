import { fastify } from "fastify";
import type { FastifyInstance } from "fastify";
import { fastifyPostgres } from "@fastify/postgres";
import { join } from "path";
import autoLoad from "@fastify/autoload";

// const envToLogger = {
//   development: {
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         translateTime: 'HH:MM:ss Z',
//         ignore: 'pid,hostname',
//       },
//     },
//   },
//   production: true,
//   test: false,
// }

// const environment = process.env.NODE_ENV || 'development';

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/dino';
console.log("Database URL:", dbUrl);
app.register(fastifyPostgres, {
  connectionString: dbUrl,
});

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
});

const start = async () => {
  try {
    await app.listen({ host: "0.0.0.0", port: 3000 });
    console.log("Server running at http://0.0.0.0:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

app.get('/healthcheck', (req, res) => {
  res.send({ message: 'ooh yeah' })
});

start();
