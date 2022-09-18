/*
  Warnings:

  - You are about to drop the column `yearPlaying` on the `Ads` table. All the data in the column will be lost.
  - Added the required column `yearsPlaying` to the `Ads` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "weekDays" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ads_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ads" ("createdAt", "discord", "gameId", "hourEnd", "hourStart", "id", "nickname", "useVoiceChannel", "weekDays") SELECT "createdAt", "discord", "gameId", "hourEnd", "hourStart", "id", "nickname", "useVoiceChannel", "weekDays" FROM "Ads";
DROP TABLE "Ads";
ALTER TABLE "new_Ads" RENAME TO "Ads";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
