-- AlterTable
ALTER TABLE "AppSettings" ADD COLUMN     "footerNoteEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "footerNoteNl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "headerTaglineEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "headerTaglineNl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "headerTitleEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "headerTitleNl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeEmptyTextEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeEmptyTextNl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeIntroTextEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeIntroTextNl" TEXT NOT NULL DEFAULT '';
