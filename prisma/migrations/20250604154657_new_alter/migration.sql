-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "likes" SET DEFAULT ARRAY[]::TEXT[];
