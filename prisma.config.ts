import "dotenv/config";
import type { PrismaConfig } from "prisma";

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    // Tells Prisma to use tsx to run your seed file
    seed: "npx tsx prisma/seed.ts", 
  }
} satisfies PrismaConfig;