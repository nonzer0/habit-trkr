import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyRequest,
} from "fastify";

interface Habit {
    id: string;
    name: string;
    description: string;
    frequency: string;
    dateCreated: string;
    dateEnded?: string;
    ownerId: string;
}

const habits: FastifyPluginAsync = async (
    app: FastifyInstance,
): Promise<void> => {
    app.get("/", async () => {
        return "HABITS HOME";
    });

    type HabitByIdRequest = FastifyRequest<{
        Params: { id: string };
    }>;

    app.get("/:id", async (req: HabitByIdRequest): Promise<Habit> => {
        req.log.info({ endpoint: "habits/getById", info: 'GET habit by id', params: req.params });
        const client = await app.pg.connect();
        let habit;
        try {
            const { rows } = await client.query(
                "SELECT * FROM habits where id = $1",
                [req.params.id],
            );
            habit = rows;
        } catch (e) {
            console.log(e);
        } finally {
            client.release();
            return habit;
        }
    });

    type CreateHabitRequest = FastifyRequest<{
        Params: { ownerId: string };
        Body: Omit<Habit, 'id' | 'dateCreated' | 'ownerId'>;
    }>;

    app.post("/:ownerId", async (req: CreateHabitRequest): Promise<Habit> => {
        const { ownerId } = req.params;
        req.log.info({ endpoint: "habits/create", info: 'creating a new habit', ownerId, body: req.body });
        const client = await app.pg.connect();
        let newHabit;
        try {
            const { name, description, frequency } = req.body;
            const dateCreated = new Date().toISOString();

            const { rows } = await client.query(
                `INSERT INTO habits 
                (name, description, frequency, date_created, owner_id) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING id, name, description, frequency, 
                         date_created as "dateCreated", 
                         owner_id as "ownerId"`,
                [name, description, frequency, dateCreated, ownerId]
            );

            newHabit = rows[0];
            req.log.info({ endpoint: "habits/create", info: 'habit created successfully' });
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            client.release();
            return newHabit;
        }
    });

    app.get("/all", async (): Promise<Habit[]> => {
        const client = await app.pg.connect();

        const { rows: habits } = await client.query(
            "SELECT * FROM habits LIMIT 50;",
        );

        client.release();

        return habits;
    });
}

export default habits;