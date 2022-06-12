/*
  Warnings:

  - Changed the type of `lahir` on the `HistoryKehamilan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusKelahiran" AS ENUM ('LAHIR', 'MENINGGAL');

-- AlterTable
ALTER TABLE "HistoryKehamilan" DROP COLUMN "lahir",
ADD COLUMN     "lahir" "StatusKelahiran" NOT NULL;
