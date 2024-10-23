CREATE TABLE "task"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(50),
    "descriptions" TEXT,
    "date" VARCHAR(255),
    "statusId" INT REFERENCES "status_task"("id")
);