-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_restaurant" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes_ingredients" (
    "id" TEXT NOT NULL,
    "id_recipe" TEXT,
    "id_ingredient" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "recipes_ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_id_recipe_fkey" FOREIGN KEY ("id_recipe") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
