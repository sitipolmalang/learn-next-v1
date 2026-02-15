-- CreateTable
CREATE TABLE "PublishedSite" (
    "id" SERIAL NOT NULL,
    "subdomain" TEXT NOT NULL,
    "blocks" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublishedSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublishedSite_subdomain_key" ON "PublishedSite"("subdomain");
