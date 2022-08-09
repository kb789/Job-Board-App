/*
  Warnings:

  - You are about to drop the column `authorId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_authorId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Author";

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
