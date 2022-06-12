/*
  Warnings:

  - Added the required column `beratPerPorsi` to the `GiziMakanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiziMakanan" ADD COLUMN     "beratPerPorsi" DOUBLE PRECISION NOT NULL;
