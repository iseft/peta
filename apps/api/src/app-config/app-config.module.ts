import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigSchema } from './app-config.schema';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        const result = appConfigSchema.safeParse(config);
        if (result.success) {
          return result.data;
        }
        throw new Error(
          `Configuration validation error: ${result.error.message}`,
        );
      },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
