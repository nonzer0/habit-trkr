
import { relations } from "drizzle-orm";

import { habits, habitDays } from "./habits";
import { users } from "./users";

export const usersRelations = relations(users, ({ many }) => ({
    habits: many(habits),
}));

export const habitRelations = relations(habits, ({ one, many }) => ({
    owner: one(users, {
        fields: [habits.ownerId],
        references: [users.id],
    }),
    habitDays: many(habitDays)
}));

/* these are days when specific habits are performed */
export const habitDaysRelations = relations(habitDays, ({ one }) => ({
    habits: one(habits, {
        fields: [habitDays.habitId],
        references: [habits.id],
    }),
}));
