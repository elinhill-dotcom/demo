-- Customer phone for delivery contact; existing rows stay empty until backfilled manually.
ALTER TABLE "Order" ADD COLUMN "phone" TEXT NOT NULL DEFAULT '';
