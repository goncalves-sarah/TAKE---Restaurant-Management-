-- DropForeignKey
ALTER TABLE "basic_prediction_data" DROP CONSTRAINT "basic_prediction_data_id_restaurant_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_prediction_data" DROP CONSTRAINT "ingredient_prediction_data_id_ingredient_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_prediction_data" DROP CONSTRAINT "ingredient_prediction_data_id_restaurant_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_portion_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_portion_id_fkey" FOREIGN KEY ("portion_id") REFERENCES "portion_size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_prediction_data" ADD CONSTRAINT "ingredient_prediction_data_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_prediction_data" ADD CONSTRAINT "ingredient_prediction_data_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basic_prediction_data" ADD CONSTRAINT "basic_prediction_data_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
