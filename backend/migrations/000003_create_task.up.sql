CREATE TABLE "task"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(50),
    "descriptions" TEXT,
    "statusId" INT REFERENCES "status_task"("id")
);