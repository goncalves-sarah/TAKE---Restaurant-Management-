/*
  Warnings:

  - The primary key for the `recipes_ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `recipes_ingredients` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "recipes_ingredients_pkey" PRIMARY KEY ("id");
