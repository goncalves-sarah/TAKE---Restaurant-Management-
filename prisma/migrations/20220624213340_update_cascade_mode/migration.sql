/*
  Warnings:

  - The primary key for the `recipes_ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipes_ingredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_id_ingredient_fkey";

-- AlterTable
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "recipes_ingredients_pkey" PRIMARY KEY ("id_recipe", "id_ingredient");

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
