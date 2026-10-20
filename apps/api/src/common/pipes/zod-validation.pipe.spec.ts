import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const pipe = new ZodValidationPipe(z.object({ word: z.string().min(1) }));

  it('returns the parsed value', () => {
    expect(pipe.transform({ word: 'perro' })).toEqual({ word: 'perro' });
  });

  it('names the failing path', () => {
    try {
      pipe.transform({ word: '' });
      fail('expected the pipe to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect((error as BadRequestException).getResponse()).toMatchObject({
        errors: [{ path: 'word' }],
      });
    }
  });
});
