-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "n_documento" TEXT,
    "tipo_documento" VARCHAR(15),
    "nombres" VARCHAR(30),
    "apellidos" VARCHAR(30),
    "genero" VARCHAR(15),
    "fecha_nacimiento" DATE,
    "telefono" VARCHAR(15),
    "correo" VARCHAR(255),
    "user_id" UUID,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_h" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "diagnosis" TEXT,
    "patient_id" UUID,

    CONSTRAINT "clinical_h_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patient_correo_key" ON "patient"("correo");

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clinical_h" ADD CONSTRAINT "clinical_h_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
