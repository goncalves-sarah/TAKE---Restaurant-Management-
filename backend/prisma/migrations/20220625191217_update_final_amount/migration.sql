/*
  Warnings:

  - You are about to drop the column `final_amound` on the `ingredient_prediction_data` table. All the data in the column will be lost.
  - Added the required column `final_amount` to the `ingredient_prediction_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredient_prediction_data" DROP COLUMN "final_amound",
ADD COLUMN     "final_amount" DOUBLE PRECISION NOT NULL;
