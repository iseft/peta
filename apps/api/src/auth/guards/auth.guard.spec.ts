import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from '@clerk/backend';
import { AuthStrategyEnum } from '../models/auth-strategy.enum';
import { AuthGuard } from './auth.guard';
import { ClerkUserAuthGuard } from './clerk-user-auth.guard';

jest.mock('@clerk/backend', () => ({ verifyToken: jest.fn() }));

function buildContext(request: Record<string, unknown>): ExecutionContext {
  return {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({ getRequest: () => request }),
  } as any;
}

describe('AuthGuard', () => {
  let reflector: { getAllAndOverride: jest.Mock };
  let guard: AuthGuard;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    const userAuthGuard = new ClerkUserAuthGuard({
      clerkSecretKey: 'sk_test_1',
    } as any);
    guard = new AuthGuard(reflector as unknown as Reflector, userAuthGuard);
  });

  it('lets a public route through without a token', async () => {
    reflector.getAllAndOverride.mockReturnValue(AuthStrategyEnum.NONE);

    await expect(
      guard.canActivate(buildContext({ headers: {} })),
    ).resolves.toBe(true);
  });

  it('refuses an undecorated route without a token', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);

    await expect(
      guard.canActivate(buildContext({ headers: {} })),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('puts the Clerk user id on the request for a valid token', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    (verifyToken as jest.Mock).mockResolvedValue({ sub: 'user_123' });
    const request = { headers: { authorization: 'Bearer valid-token' } };

    await expect(guard.canActivate(buildContext(request))).resolves.toBe(true);
    expect(request).toHaveProperty('clerkUserId', 'user_123');
  });

  it('refuses a token Clerk rejects', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    (verifyToken as jest.Mock).mockRejectedValue(new Error('expired'));

    await expect(
      guard.canActivate(
        buildContext({ headers: { authorization: 'Bearer bad-token' } }),
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
