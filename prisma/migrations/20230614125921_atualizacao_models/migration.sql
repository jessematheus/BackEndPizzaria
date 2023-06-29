/*
  Warnings:

  - You are about to drop the column `oreder_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_oreder_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "oreder_id",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
