import { Logger } from '@nestjs/common';
import { PrismaClient } from '@db';
import { SEED_CATEGORIES } from './seed-content';

const DELETED_ACCOUNT_RETENTION_YEARS = 3;

// Upserts the Categories and removes expired deleted-account records. Runs
// before every deploy, after migrations, so editing seed-content.ts is how
// Categories change. A standalone script rather than a Nest module, so it
// talks to Prisma directly.
async function seed(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(
      SEED_CATEGORIES.map((category) =>
        prisma.category.upsert({
          where: { id: category.id },
          create: category,
          update: category,
        }),
      ),
    );
    Logger.log(`Seeded ${SEED_CATEGORIES.length} Categories`, 'Seed');

    // The privacy policy promises deleted-account records last at most three
    // years; this step runs before every deploy, so it enforces that.
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() - DELETED_ACCOUNT_RETENTION_YEARS);
    const { count } = await prisma.deletedAccount.deleteMany({
      where: { deletedAt: { lt: expiry } },
    });
    if (count > 0) {
      Logger.log(`Removed ${count} expired deleted-account records`, 'Seed');
    }
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error: unknown) => {
  Logger.error(error, 'Seed');
  process.exit(1);
});
