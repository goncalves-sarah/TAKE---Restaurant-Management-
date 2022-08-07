-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_restaurant" TEXT,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
