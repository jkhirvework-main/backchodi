/*
  Warnings:

  - Added the required column `targetId` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchHistory" ADD COLUMN     "targetId" TEXT NOT NULL;
