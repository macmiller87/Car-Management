-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "carLicensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars_Registrations" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TEXT NOT NULL DEFAULT '',
    "driver_name" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "car_name" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "reason_for_use" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cars_Registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cars_carLicensePlate_key" ON "Cars"("carLicensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_name_key" ON "Drivers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_Registrations_driver_name_key" ON "Cars_Registrations"("driver_name");

-- AddForeignKey
ALTER TABLE "Cars_Registrations" ADD CONSTRAINT "Cars_Registrations_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars_Registrations" ADD CONSTRAINT "Cars_Registrations_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
