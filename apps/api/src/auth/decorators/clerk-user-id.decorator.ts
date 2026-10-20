import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../models/authenticated-request';

export const ClerkUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.clerkUserId) {
      throw new UnauthorizedException('Clerk user ID not found in request');
    }
    return request.clerkUserId;
  },
);
