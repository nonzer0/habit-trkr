CREATE TYPE "public"."roles" AS ENUM('guest', 'user', 'admin');--> statement-breakpoint
CREATE TABLE "dinosaurs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"dinosaur_id" integer,
	"description" text,
	"date_created" timestamp DEFAULT now(),
	"is_complete" boolean
);
--> statement-breakpoint
CREATE TABLE "habit_days" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer,
	"date" timestamp
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"frequency" integer,
	"date_created" timestamp DEFAULT now(),
	"dateEnded" date,
	"owner_id" integer,
	CONSTRAINT "frequency_check1" CHECK ("habits"."frequency" >= 1 AND "habits"."frequency" <= 7)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"email" varchar NOT NULL,
	"role" "roles" DEFAULT 'guest'
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_dinosaur_id_fkey" FOREIGN KEY ("dinosaur_id") REFERENCES "public"."dinosaurs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");