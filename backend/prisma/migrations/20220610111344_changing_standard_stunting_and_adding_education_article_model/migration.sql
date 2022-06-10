/*
  Warnings:

  - Added the required column `gender` to the `StandardStunting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StandardStunting" ADD COLUMN     "gender" "JenisKelamin" NOT NULL;

-- CreateTable
CREATE TABLE "EducationArticle" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "urlToImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationArticle_pkey" PRIMARY KEY ("id")
);
