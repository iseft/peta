import { verifyToken } from '@clerk/backend';
import {
  type ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AppConfigService } from '../../app-config/app-config.service';
import type { AuthenticatedRequest } from '../models/authenticated-request';

@Injectable()
export class ClerkUserAuthGuard {
  private readonly logger = new Logger(ClerkUserAuthGuard.name);

  constructor(private appConfigService: AppConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = req.headers.authorization?.split(' ').pop();
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.appConfigService.clerkSecretKey,
      });
      req.clerkUserId = tokenPayload.sub;
      return true;
    } catch (error) {
      this.logger.error(
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw new UnauthorizedException('Invalid token');
    }
  }
}
