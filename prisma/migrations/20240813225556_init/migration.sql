-- CreateTable
CREATE TABLE "Criminoso" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER,

    CONSTRAINT "Criminoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crime" (
    "id" UUID NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "criminoso_id" UUID NOT NULL,

    CONSTRAINT "Crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arma" (
    "id" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "crime_id" UUID NOT NULL,

    CONSTRAINT "Arma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Crime" ADD CONSTRAINT "Crime_criminoso_id_fkey" FOREIGN KEY ("criminoso_id") REFERENCES "Criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arma" ADD CONSTRAINT "Arma_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "Crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
