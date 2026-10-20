import { Controller, Delete, HttpCode } from '@nestjs/common';
import { ClerkUserId } from '../auth/decorators/clerk-user-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  // Deletes the caller's data and their Clerk account.
  @Delete('me')
  @HttpCode(204)
  deleteMyAccount(@ClerkUserId() clerkId: string): Promise<void> {
    return this.users.deleteAccount(clerkId);
  }
}
