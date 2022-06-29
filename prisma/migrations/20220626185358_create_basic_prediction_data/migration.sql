-- CreateTable
CREATE TABLE "basic_prediction_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "precipitation" DOUBLE PRECISION NOT NULL,
    "customer_amount" INTEGER NOT NULL,
    "id_restaurant" TEXT NOT NULL,

    CONSTRAINT "basic_prediction_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "basic_prediction_data" ADD CONSTRAINT "basic_prediction_data_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
