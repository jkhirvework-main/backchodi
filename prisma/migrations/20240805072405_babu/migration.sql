-- CreateTable
CREATE TABLE "Oem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'nan',

    CONSTRAINT "Oem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parId" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT 'nan',

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "parId" TEXT NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parId" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubModule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parId" TEXT NOT NULL,

    CONSTRAINT "SubModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WiringDiagram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uId" TEXT NOT NULL,
    "parId" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "baseWires" JSONB NOT NULL DEFAULT '[]',
    "components" JSONB NOT NULL DEFAULT '[]',
    "groups" JSONB NOT NULL DEFAULT '[]',
    "connections" JSONB NOT NULL DEFAULT '[]',
    "multiWireConnectors" JSONB NOT NULL DEFAULT '[]',
    "textWidgets" JSONB NOT NULL DEFAULT '[]',
    "connectors" JSONB NOT NULL DEFAULT '[]',
    "data" JSONB NOT NULL DEFAULT '[]',
    "wiringDiagramId" INTEGER NOT NULL,

    CONSTRAINT "WiringDiagram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Oem_name_key" ON "Oem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Oem_slug_key" ON "Oem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Model_name_key" ON "Model"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Model_slug_key" ON "Model"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubModule_name_key" ON "SubModule"("name");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_parId_fkey" FOREIGN KEY ("parId") REFERENCES "Oem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_parId_fkey" FOREIGN KEY ("parId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_parId_fkey" FOREIGN KEY ("parId") REFERENCES "Engine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubModule" ADD CONSTRAINT "SubModule_parId_fkey" FOREIGN KEY ("parId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WiringDiagram" ADD CONSTRAINT "WiringDiagram_parId_fkey" FOREIGN KEY ("parId") REFERENCES "SubModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
