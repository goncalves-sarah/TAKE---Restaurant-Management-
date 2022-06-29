-- CreateTable
CREATE TABLE "portion_size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_restaurant" TEXT NOT NULL,

    CONSTRAINT "portion_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "id_recipe" TEXT NOT NULL,
    "id_restaurant" TEXT NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "portion_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portion_size" ADD CONSTRAINT "portion_size_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_recipe_fkey" FOREIGN KEY ("id_recipe") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_portion_id_fkey" FOREIGN KEY ("portion_id") REFERENCES "portion_size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
