/*
  Warnings:

  - You are about to drop the column `trisemester` on the `StandarGizi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StandarGizi" DROP COLUMN "trisemester",
ADD COLUMN     "trimester" INTEGER,
ALTER COLUMN "satuan" DROP NOT NULL;
