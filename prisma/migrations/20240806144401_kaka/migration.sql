/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isBlocked",
DROP COLUMN "phone",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "workshopName" DROP NOT NULL,
ALTER COLUMN "workshopLocation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Mob" (
    "id" TEXT NOT NULL,
    "mob" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Mob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mob_mob_key" ON "Mob"("mob");
