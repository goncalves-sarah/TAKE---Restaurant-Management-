/*
  Warnings:

  - Made the column `id_restaurant` on table `ingredients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_restaurant` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_recipe` on table `recipes_ingredients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_ingredient` on table `recipes_ingredients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_id_ingredient_fkey";

-- AlterTable
ALTER TABLE "ingredients" ALTER COLUMN "id_restaurant" SET NOT NULL;

-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "id_restaurant" SET NOT NULL;

-- AlterTable
ALTER TABLE "recipes_ingredients" ALTER COLUMN "id_recipe" SET NOT NULL,
ALTER COLUMN "id_ingredient" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
