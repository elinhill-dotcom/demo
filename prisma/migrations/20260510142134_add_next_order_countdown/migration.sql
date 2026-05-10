-- AlterTable
ALTER TABLE "AppSettings" ADD COLUMN     "countdownTextEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "countdownTextNl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nextOrderAt" TIMESTAMP(3);
