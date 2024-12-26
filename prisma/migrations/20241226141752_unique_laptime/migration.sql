/*
  Warnings:

  - A unique constraint covering the columns `[userId,trackLayoutId,motorcycleId]` on the table `LapTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LapTime_userId_trackLayoutId_motorcycleId_key" ON "LapTime"("userId", "trackLayoutId", "motorcycleId");
