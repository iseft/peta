import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetAuthStrategy } from '../decorators/set-auth-strategy.decorator';
import { AuthStrategyEnum } from '../models/auth-strategy.enum';
import { ClerkUserAuthGuard } from './clerk-user-auth.guard';

// Every route requires a signed-in user unless it opts out with @Public().
// There is no admin access level yet, so there is no @GrantAccess either.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userAuthGuard: ClerkUserAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const strategy =
      this.reflector.getAllAndOverride<AuthStrategyEnum>(SetAuthStrategy, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthStrategyEnum.JWT;

    if (strategy === AuthStrategyEnum.NONE) {
      return true;
    }

    return this.userAuthGuard.canActivate(context);
  }
}
