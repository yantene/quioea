-- CreateTable
CREATE TABLE "Task" (
"id" SERIAL,
    "label" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
