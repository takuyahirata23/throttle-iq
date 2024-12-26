/*
  Warnings:

  - A unique constraint covering the columns `[year,modelId,userId]` on the table `Motorcycle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_year_modelId_userId_key" ON "Motorcycle"("year", "modelId", "userId");
