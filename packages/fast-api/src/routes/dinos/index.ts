import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
} from "fastify";

interface Dino {
  id: number;
  name: string;
  description: string;
}

const dinos: FastifyPluginAsync = async (
  app: FastifyInstance,
): Promise<void> => {
  app.get("/", async () => {
    return "Welcome to a dinosaur api!";
  });

  type DinoByIdRequest = FastifyRequest<{
    Params: { id: string };
  }>;

  app.get("/:id", async (req: DinoByIdRequest) => {
    const client = await app.pg.connect();

    const { rows: dinos } = await client.query(
      "SELECT * FROM dinosaurs where id = $1",
      [req.params.id],
    );

    client.release();

    return dinos;
  });

  app.get("/all", async (): Promise<Dino[]> => {
    const client = await app.pg.connect();

    const { rows: dinos } = await client.query(
      "SELECT * FROM dinosaurs LIMIT 50;",
    );

    client.release();

    return dinos;
  });
};

export default dinos;
