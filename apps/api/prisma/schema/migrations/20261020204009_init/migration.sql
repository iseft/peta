-- CreateEnum
CREATE TYPE "public"."RecurrenceUnit" AS ENUM ('WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "public"."BudgetClass" AS ENUM ('NEED', 'WANT', 'SAVING');

-- CreateEnum
CREATE TYPE "public"."CategoryKind" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "public"."AssetClass" AS ENUM ('STOCK', 'BOND', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."FundKind" AS ENUM ('SAVINGS', 'EMERGENCY_FUND');

-- CreateEnum
CREATE TYPE "public"."FundMovement" AS ENUM ('CONTRIBUTION', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "public"."BudgetItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "name" TEXT,
    "amountMinor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "rateToDefault" DECIMAL(20,10) NOT NULL,
    "recurrenceUnit" "public"."RecurrenceUnit",
    "recurrenceInterval" INTEGER,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "public"."CategoryKind" NOT NULL,
    "budgetClass" "public"."BudgetClass",
    "plannable" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subcategory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExchangeRate" (
    "date" DATE NOT NULL,
    "currency" TEXT NOT NULL,
    "rate" DECIMAL(20,10) NOT NULL,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("date","currency")
);

-- CreateTable
CREATE TABLE "public"."Fund" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "public"."FundKind" NOT NULL,
    "openingBalanceMinor" BIGINT NOT NULL DEFAULT 0,
    "openingBalanceCurrency" TEXT,
    "openingBalanceRate" DECIMAL(20,10),
    "openingBalanceDate" DATE,
    "rebalanceDueOn" DATE,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Holding" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assetClass" "public"."AssetClass",
    "targetAllocationPercent" DECIMAL(5,2) NOT NULL,
    "expectedAnnualReturnPercent" DECIMAL(5,2),
    "position" INTEGER NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "currency" TEXT NOT NULL,
    "rateToDefault" DECIMAL(20,10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Line" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "subcategoryId" TEXT,
    "amountMinor" BIGINT NOT NULL,
    "budgetItemId" TEXT,
    "fundKind" "public"."FundKind",
    "fundMovement" "public"."FundMovement",
    "position" INTEGER NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "defaultCurrency" TEXT,
    "openingBalanceMinor" BIGINT,
    "openingBalanceCurrency" TEXT,
    "openingBalanceRate" DECIMAL(20,10),
    "openingBalanceDate" DATE,
    "emergencyFundTargetMonths" INTEGER NOT NULL DEFAULT 6,
    "onboardedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeletedAccount" (
    "clerkId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletedAccount_pkey" PRIMARY KEY ("clerkId")
);

-- CreateTable
CREATE TABLE "public"."PaymentDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "holderName" TEXT,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BudgetItem_userId_idx" ON "public"."BudgetItem"("userId");

-- CreateIndex
CREATE INDEX "Subcategory_userId_idx" ON "public"."Subcategory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_userId_categoryId_name_key" ON "public"."Subcategory"("userId", "categoryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_userId_kind_key" ON "public"."Fund"("userId", "kind");

-- CreateIndex
CREATE INDEX "Holding_fundId_idx" ON "public"."Holding"("fundId");

-- CreateIndex
CREATE INDEX "Transaction_userId_date_idx" ON "public"."Transaction"("userId", "date");

-- CreateIndex
CREATE INDEX "Line_transactionId_idx" ON "public"."Line"("transactionId");

-- CreateIndex
CREATE INDEX "Line_budgetItemId_idx" ON "public"."Line"("budgetItemId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE INDEX "PaymentDetail_userId_idx" ON "public"."PaymentDetail"("userId");

-- AddForeignKey
ALTER TABLE "public"."BudgetItem" ADD CONSTRAINT "BudgetItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BudgetItem" ADD CONSTRAINT "BudgetItem_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subcategory" ADD CONSTRAINT "Subcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fund" ADD CONSTRAINT "Fund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Holding" ADD CONSTRAINT "Holding_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "public"."Fund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Line" ADD CONSTRAINT "Line_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Line" ADD CONSTRAINT "Line_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Line" ADD CONSTRAINT "Line_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "public"."BudgetItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentDetail" ADD CONSTRAINT "PaymentDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
