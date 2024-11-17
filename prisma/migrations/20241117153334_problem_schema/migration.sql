-- First, drop the existing tables and constraints if they exist
DROP TABLE IF EXISTS "Problem";

-- Drop the existing enum type
DROP TYPE IF EXISTS "Difficulty";

-- Recreate the enum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- Recreate the Problem table
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "userId" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- Add the foreign key constraint
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "user"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- Clear the migration history for this migration
DELETE FROM "_prisma_migrations"
WHERE migration_name = '20241117153334_problem_schema';
