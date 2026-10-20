import { ClerkUsersClient } from './clerk-users.client';

function clientWith(deleteUser: jest.Mock) {
  const client = new ClerkUsersClient({ clerkSecretKey: 'sk_test_x' } as any);
  (client as any).clerk = { users: { deleteUser } };
  return client;
}

describe('ClerkUsersClient.deleteClerkUser', () => {
  it('treats an already deleted user as done', async () => {
    const client = clientWith(
      jest
        .fn()
        .mockRejectedValue(
          Object.assign(new Error('Not Found'), { status: 404 }),
        ),
    );

    await expect(client.deleteClerkUser('user_1')).resolves.toBeUndefined();
  });

  it('passes other failures on', async () => {
    const client = clientWith(
      jest
        .fn()
        .mockRejectedValue(Object.assign(new Error('Boom'), { status: 500 })),
    );

    await expect(client.deleteClerkUser('user_1')).rejects.toThrow('Boom');
  });
});
