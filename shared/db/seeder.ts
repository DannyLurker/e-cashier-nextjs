import { PrismaClient, Roles } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // 1. Clean existing data (Optional, but good for testing)
  await prisma.user.deleteMany();

  const users = [
    {
      name: "Admin User",
      email: "admin@pos.com",
      password: password,
      role: Roles.ADMIN,
    },
    {
      name: "Manager User",
      email: "manager@pos.com",
      password: password,
      role: Roles.MANAGER,
    },
    {
      name: "Inventory Staff",
      email: "inventory@pos.com",
      password: password,
      role: Roles.INVENTORY,
    },
    {
      name: "Cashier User",
      email: "cashier@pos.com",
      password: password,
      role: Roles.CASHIER,
    },
  ];

  console.log("Seed started...");

  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user: ${user.email} with role: ${user.role}`);
  }

  console.log("Seed finished successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
