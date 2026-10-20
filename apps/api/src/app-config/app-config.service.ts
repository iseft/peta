import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.getOrThrow<number>('PORT');
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get databaseUrl(): string {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get clerkSecretKey(): string {
    return this.configService.getOrThrow<string>('CLERK_SECRET_KEY');
  }

  get fxApiUrl(): string {
    return this.configService.getOrThrow<string>('FX_API_URL');
  }

  get environmentName(): string {
    return (
      this.configService.get<string>('RAILWAY_ENVIRONMENT_NAME') ?? 'local'
    );
  }
}
