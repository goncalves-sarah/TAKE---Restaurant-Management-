/*
  Warnings:

  - The primary key for the `recipes_ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipes_ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "recipes_ingredients_pkey" PRIMARY KEY ("id_recipe", "id_ingredient");
