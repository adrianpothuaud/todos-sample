/*
  Warnings:

  - You are about to drop the column `category` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoItem" DROP COLUMN "category",
DROP COLUMN "imageUrl",
DROP COLUMN "url";

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "category",
DROP COLUMN "imageUrl",
DROP COLUMN "url";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
