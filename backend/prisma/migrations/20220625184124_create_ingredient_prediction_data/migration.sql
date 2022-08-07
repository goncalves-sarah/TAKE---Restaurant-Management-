-- CreateTable
CREATE TABLE "ingredient_prediction_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_restaurant" TEXT NOT NULL,
    "id_ingredient" TEXT NOT NULL,
    "initial_amount" DOUBLE PRECISION NOT NULL,
    "final_amound" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "ingredient_prediction_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient_prediction_data" ADD CONSTRAINT "ingredient_prediction_data_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_prediction_data" ADD CONSTRAINT "ingredient_prediction_data_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
