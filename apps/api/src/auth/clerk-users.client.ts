import { createClerkClient, type ClerkClient } from '@clerk/backend';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';

// The Clerk Backend API, for what a token alone can't do.
@Injectable()
export class ClerkUsersClient {
  private readonly clerk: ClerkClient;

  constructor(appConfigService: AppConfigService) {
    this.clerk = createClerkClient({
      secretKey: appConfigService.clerkSecretKey,
    });
  }

  async findPrimaryEmail(clerkId: string): Promise<string | null> {
    const user = await this.clerk.users.getUser(clerkId);
    return user.primaryEmailAddress?.emailAddress ?? null;
  }

  // Already gone counts as done, so a retried deletion succeeds.
  async deleteClerkUser(clerkId: string): Promise<void> {
    try {
      await this.clerk.users.deleteUser(clerkId);
    } catch (error) {
      if ((error as { status?: number }).status === 404) return;
      throw error;
    }
  }
}
