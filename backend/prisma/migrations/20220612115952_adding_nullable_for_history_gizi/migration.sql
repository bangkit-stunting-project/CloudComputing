-- DropForeignKey
ALTER TABLE "HistoryGizi" DROP CONSTRAINT "HistoryGizi_anakId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryGizi" DROP CONSTRAINT "HistoryGizi_ibuId_fkey";

-- AlterTable
ALTER TABLE "HistoryGizi" ALTER COLUMN "anakId" DROP NOT NULL,
ALTER COLUMN "ibuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "UserDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Anak"("id") ON DELETE SET NULL ON UPDATE CASCADE;
