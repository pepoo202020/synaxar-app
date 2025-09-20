-- CreateEnum
CREATE TYPE "public"."CopticMonths" AS ENUM ('THOUT', 'PAOPI', 'HATHOR', 'KOIAK', 'TOBI', 'MESHIR', 'PAREMHAT', 'PAREMOUDE', 'PASHONS', 'PAONI', 'EPIP', 'MASORI', 'KOGIENAVOT');

-- CreateTable
CREATE TABLE "public"."synaxar_data" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" "public"."CopticMonths" NOT NULL,
    "isSaint" BOOLEAN DEFAULT false,
    "isMartyr" BOOLEAN DEFAULT false,
    "isOccasion" BOOLEAN DEFAULT false,
    "isMain" BOOLEAN DEFAULT false,
    "name_ar" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_co" TEXT,
    "description_ar" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_co" TEXT,
    "image" TEXT,
    "slug" TEXT NOT NULL,
    "postImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "synaxar_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "synaxar_data_slug_idx" ON "public"."synaxar_data"("slug");
