/*
  Warnings:

  - You are about to drop the column `desctiption` on the `SearchHistory` table. All the data in the column will be lost.
  - Added the required column `description` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchHistory" DROP COLUMN "desctiption",
ADD COLUMN     "description" TEXT NOT NULL;
