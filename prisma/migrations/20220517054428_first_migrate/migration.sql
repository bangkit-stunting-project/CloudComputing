-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "profilePicture" TEXT,
    "jenisKelamin" "JenisKelamin" NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anak" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "Anak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryGizi" (
    "id" SERIAL NOT NULL,
    "anakId" INTEGER NOT NULL,
    "ibuId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "namaMakanan" TEXT NOT NULL,
    "persentaseHabis" INTEGER NOT NULL,
    "VitA" DOUBLE PRECISION NOT NULL,
    "VitB1" DOUBLE PRECISION NOT NULL,
    "VitB2" DOUBLE PRECISION NOT NULL,
    "VitB3" DOUBLE PRECISION NOT NULL,
    "VitC" DOUBLE PRECISION NOT NULL,
    "Energi" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Lemak" DOUBLE PRECISION NOT NULL,
    "Karbohidrat" DOUBLE PRECISION NOT NULL,
    "Serat" DOUBLE PRECISION NOT NULL,
    "Air" DOUBLE PRECISION NOT NULL,
    "Ca" DOUBLE PRECISION NOT NULL,
    "F" DOUBLE PRECISION NOT NULL,
    "Fe2" DOUBLE PRECISION NOT NULL,
    "Zn2" DOUBLE PRECISION NOT NULL,
    "Ka" DOUBLE PRECISION NOT NULL,
    "Na" DOUBLE PRECISION NOT NULL,
    "Cu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistoryGizi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryStunting" (
    "id" SERIAL NOT NULL,
    "anakId" INTEGER NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "result" BOOLEAN NOT NULL,

    CONSTRAINT "HistoryStunting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandarGizi" (
    "id" SERIAL NOT NULL,
    "awalRentang" INTEGER NOT NULL,
    "akhirRentang" INTEGER NOT NULL,
    "trisemester" INTEGER,
    "satuan" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,

    CONSTRAINT "StandarGizi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandarGiziDetails" (
    "id" SERIAL NOT NULL,
    "standarGiziId" INTEGER NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,
    "beratBadan" INTEGER NOT NULL,
    "VitA" DOUBLE PRECISION NOT NULL,
    "VitB1" DOUBLE PRECISION NOT NULL,
    "VitB2" DOUBLE PRECISION NOT NULL,
    "VitB3" DOUBLE PRECISION NOT NULL,
    "VitC" DOUBLE PRECISION NOT NULL,
    "Energi" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Lemak" DOUBLE PRECISION NOT NULL,
    "Karbohidrat" DOUBLE PRECISION NOT NULL,
    "Serat" DOUBLE PRECISION NOT NULL,
    "Air" DOUBLE PRECISION NOT NULL,
    "Ca" DOUBLE PRECISION NOT NULL,
    "F" DOUBLE PRECISION NOT NULL,
    "Fe2" DOUBLE PRECISION NOT NULL,
    "Zn2" DOUBLE PRECISION NOT NULL,
    "Ka" DOUBLE PRECISION NOT NULL,
    "Na" DOUBLE PRECISION NOT NULL,
    "Cu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StandarGiziDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StandarGiziDetails_standarGiziId_key" ON "StandarGiziDetails"("standarGiziId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anak" ADD CONSTRAINT "Anak_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UserDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "UserDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Anak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryStunting" ADD CONSTRAINT "HistoryStunting_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Anak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandarGiziDetails" ADD CONSTRAINT "StandarGiziDetails_standarGiziId_fkey" FOREIGN KEY ("standarGiziId") REFERENCES "StandarGizi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
