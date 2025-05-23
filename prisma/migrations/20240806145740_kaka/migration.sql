/*
  Warnings:

  - A unique constraint covering the columns `[mobId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_mobId_key" ON "User"("mobId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
