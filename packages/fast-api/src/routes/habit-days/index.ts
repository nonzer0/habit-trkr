
import type {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyRequest,
} from "fastify";

interface HabitDays {
    id: string;
    habitId: string;
    date: string;
}

const habitDays: FastifyPluginAsync = async (
    app: FastifyInstance,
): Promise<void> => {

    app.get("/", async () => {
        return "HABIT Days HOMiE!!";
    });
}

export default habitDays;