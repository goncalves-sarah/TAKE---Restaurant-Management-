-- CreateTable
CREATE TABLE "restaurants_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "id_restaurant" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants_tokens" ADD CONSTRAINT "restaurants_tokens_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
