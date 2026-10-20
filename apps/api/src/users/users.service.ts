import { Injectable } from '@nestjs/common';
import { Prisma, type User } from '@db';
import { ClerkUsersClient } from '../auth/clerk-users.client';
import { AccountDeletedError } from '../common/exceptions/account-deleted-error';
import { OnboardingRequiredError } from '../common/exceptions/onboarding-required-error';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly users: UsersRepository,
    private readonly clerkUsers: ClerkUsersClient,
  ) {}

  // Server data first, recorded as deleted so no racing request can bring it
  // back. If the Clerk step then fails, the user can still sign in and retry;
  // the other way round, a failure would strand their data.
  async deleteAccount(clerkId: string): Promise<void> {
    await this.users.deleteUserAndRecordDeletion(clerkId);
    await this.clerkUsers.deleteClerkUser(clerkId);
  }

  // A user's first request creates their row. Two requests at once can both
  // miss it and race to create it; the loser reads the winner's row.
  // A deleted account is never recreated.
  async getOrCreateUser(clerkId: string): Promise<User> {
    const existing = await this.users.findUserByClerkId(clerkId);
    if (existing) {
      return existing;
    }

    let created: User | null;
    try {
      created = await this.users.createUserUnlessDeleted(clerkId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const winner = await this.users.findUserByClerkId(clerkId);
        if (winner) {
          return winner;
        }
      }
      throw error;
    }
    if (!created) {
      throw new AccountDeletedError();
    }
    return created;
  }

  // Planning and recording need a Default Currency, which onboarding sets.
  async getOnboardedUser(
    clerkId: string,
  ): Promise<User & { defaultCurrency: string }> {
    const user = await this.getOrCreateUser(clerkId);
    if (!user.defaultCurrency) {
      throw new OnboardingRequiredError();
    }
    return user as User & { defaultCurrency: string };
  }
}
