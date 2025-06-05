/*
  Warnings:

  - Added the required column `dataDescription` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataImage` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataTitle` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "dataDescription" TEXT NOT NULL,
ADD COLUMN     "dataImage" TEXT NOT NULL,
ADD COLUMN     "dataTitle" TEXT NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;
