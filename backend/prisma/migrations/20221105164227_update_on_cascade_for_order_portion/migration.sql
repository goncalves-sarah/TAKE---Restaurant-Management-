-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_portion_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_portion_id_fkey" FOREIGN KEY ("portion_id") REFERENCES "portion_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
