import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@db';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  findUserByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { clerkId } });
  }

  updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  // Creating and deleting take the same per-account lock, so a request racing a
  // deletion either creates the user before the deletion (and is deleted
  // with it) or sees the deletion and gets null.
  createUserUnlessDeleted(clerkId: string): Promise<User | null> {
    return this.prisma.$transaction(async (tx) => {
      await lockAccount(tx, clerkId);
      const deleted = await tx.deletedAccount.findUnique({
        where: { clerkId },
      });
      if (deleted) return null;
      // Every user has Savings and an Emergency Fund from the start.
      return tx.user.create({
        data: {
          clerkId,
          funds: { create: [{ kind: 'SAVINGS' }, { kind: 'EMERGENCY_FUND' }] },
        },
      });
    });
  }

  // Every table holding a user's data cascades from the user row.
  async deleteUserAndRecordDeletion(clerkId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await lockAccount(tx, clerkId);
      await tx.deletedAccount.upsert({
        where: { clerkId },
        create: { clerkId },
        update: {},
      });
      await tx.user.deleteMany({ where: { clerkId } });
    });
  }
}

// Released when the transaction ends.
async function lockAccount(
  tx: Prisma.TransactionClient,
  clerkId: string,
): Promise<void> {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${clerkId}))`;
}
