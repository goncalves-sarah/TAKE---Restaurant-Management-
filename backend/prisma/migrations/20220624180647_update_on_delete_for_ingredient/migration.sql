-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_id_restaurant_fkey";

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
