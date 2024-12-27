-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'ERROR');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "bike" DROP NOT NULL;
