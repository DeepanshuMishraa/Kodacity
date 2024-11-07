/*
  Warnings:

  - You are about to drop the column `Provider` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "Provider",
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'email';

-- DropEnum
DROP TYPE "Provider";
