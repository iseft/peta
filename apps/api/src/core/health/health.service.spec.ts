import { ServiceUnavailableException } from '@nestjs/common';
import { healthStatusSchema } from '@peta/shared';
import { HealthService } from './health.service';

describe('HealthService', () => {
  it('reports ok when the database answers', async () => {
    const service = new HealthService({
      ping: jest.fn().mockResolvedValue(undefined),
    } as any);

    const status = await service.check();

    expect(healthStatusSchema.parse(status).status).toBe('ok');
  });

  it('reports unavailable when the database does not answer', async () => {
    const service = new HealthService({
      ping: jest.fn().mockRejectedValue(new Error('connection refused')),
    } as any);

    await expect(service.check()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});
