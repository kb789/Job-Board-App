/*
  Warnings:

  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "company",
ADD COLUMN     "companyName" TEXT DEFAULT 'undefined';
