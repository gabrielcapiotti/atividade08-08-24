/*
  Warnings:

  - You are about to drop the column `data` on the `Crime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crime" DROP COLUMN "data",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
