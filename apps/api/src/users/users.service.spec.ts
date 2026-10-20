import { Prisma } from '@db';
import { AccountDeletedError } from '../common/exceptions/account-deleted-error';
import { UsersService } from './users.service';

const user = { id: 'user-1', clerkId: 'clerk_1', createdAt: new Date() };

function uniqueViolation() {
  return new Prisma.PrismaClientKnownRequestError('Unique constraint', {
    code: 'P2002',
    clientVersion: 'test',
  });
}

describe('UsersService.getOrCreateUser', () => {
  it('returns the existing user without creating one', async () => {
    const users = {
      findUserByClerkId: jest.fn().mockResolvedValue(user),
      createUserUnlessDeleted: jest.fn(),
    };

    await expect(
      new UsersService(users as any, {} as any).getOrCreateUser('clerk_1'),
    ).resolves.toBe(user);
    expect(users.createUserUnlessDeleted).not.toHaveBeenCalled();
  });

  it('creates the user on their first request', async () => {
    const users = {
      findUserByClerkId: jest.fn().mockResolvedValue(null),
      createUserUnlessDeleted: jest.fn().mockResolvedValue(user),
    };

    await expect(
      new UsersService(users as any, {} as any).getOrCreateUser('clerk_1'),
    ).resolves.toBe(user);
  });

  it('reads the row a concurrent request created in the meantime', async () => {
    const users = {
      findUserByClerkId: jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(user),
      createUserUnlessDeleted: jest.fn().mockRejectedValue(uniqueViolation()),
    };

    await expect(
      new UsersService(users as any, {} as any).getOrCreateUser('clerk_1'),
    ).resolves.toBe(user);
  });

  it('refuses to recreate a deleted account', async () => {
    const users = {
      findUserByClerkId: jest.fn().mockResolvedValue(null),
      createUserUnlessDeleted: jest.fn().mockResolvedValue(null),
    };

    await expect(
      new UsersService(users as any, {} as any).getOrCreateUser('clerk_1'),
    ).rejects.toBeInstanceOf(AccountDeletedError);
  });
});

describe('UsersService.deleteAccount', () => {
  it('deletes the server data before the Clerk account', async () => {
    const calls: string[] = [];
    const users = {
      deleteUserAndRecordDeletion: jest.fn(() => {
        calls.push('data');
        return Promise.resolve();
      }),
    };
    const clerkUsers = {
      deleteClerkUser: jest.fn(() => {
        calls.push('clerk');
        return Promise.resolve();
      }),
    };

    await new UsersService(users as any, clerkUsers as any).deleteAccount(
      'clerk_1',
    );

    expect(users.deleteUserAndRecordDeletion).toHaveBeenCalledWith('clerk_1');
    expect(clerkUsers.deleteClerkUser).toHaveBeenCalledWith('clerk_1');
    expect(calls).toEqual(['data', 'clerk']);
  });

  it('keeps the Clerk account when deleting the data fails, so it can be retried', async () => {
    const users = {
      deleteUserAndRecordDeletion: jest
        .fn()
        .mockRejectedValue(new Error('db down')),
    };
    const clerkUsers = { deleteClerkUser: jest.fn() };

    await expect(
      new UsersService(users as any, clerkUsers as any).deleteAccount(
        'clerk_1',
      ),
    ).rejects.toThrow('db down');
    expect(clerkUsers.deleteClerkUser).not.toHaveBeenCalled();
  });

  it('succeeds for a user who never made a request', async () => {
    const users = {
      deleteUserAndRecordDeletion: jest.fn().mockResolvedValue(undefined),
    };
    const clerkUsers = {
      deleteClerkUser: jest.fn().mockResolvedValue(undefined),
    };

    await expect(
      new UsersService(users as any, clerkUsers as any).deleteAccount(
        'clerk_1',
      ),
    ).resolves.toBeUndefined();
  });
});
