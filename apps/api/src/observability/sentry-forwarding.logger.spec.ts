import * as Sentry from '@sentry/nestjs';
import { SentryForwardingLogger } from './sentry-forwarding.logger';

describe('SentryForwardingLogger', () => {
  let logger: SentryForwardingLogger;
  let sentryWarn: jest.SpyInstance;
  let sentryError: jest.SpyInstance;

  beforeEach(() => {
    logger = new SentryForwardingLogger();
    // Nest's own output is not the subject here, and it is noisy.
    jest.spyOn(process.stdout, 'write').mockReturnValue(true);
    jest.spyOn(process.stderr, 'write').mockReturnValue(true);
    sentryWarn = jest.spyOn(Sentry.logger, 'warn').mockImplementation();
    sentryError = jest.spyOn(Sentry.logger, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('forwards a warning with its context', () => {
    logger.warn('Could not subscribe a@b.com', 'NewsletterService');

    expect(sentryWarn).toHaveBeenCalledWith('Could not subscribe a@b.com', {
      context: 'NewsletterService',
    });
  });

  it('forwards an error', () => {
    logger.error('Resend refused the alert', 'EmailService');

    expect(sentryError).toHaveBeenCalledWith('Resend refused the alert', {
      context: 'EmailService',
    });
  });

  // The stack is the whole reason anyone opens the line. Nest passes it as
  // the argument before the context, and both arrive as strings.
  it('keeps the stack Nest passes before the context', () => {
    const stack = 'Error: boom\n    at subscribe (newsletter.service.js:120)';

    logger.error('Could not subscribe', stack, 'NewsletterService');

    expect(sentryError).toHaveBeenCalledWith('Could not subscribe', {
      context: 'NewsletterService',
      stack,
    });
  });

  // Services also hand the error object straight to the logger.
  it('unpacks an Error passed as the message', () => {
    const error = new Error('domain not verified');

    logger.error(error, 'EmailService');

    expect(sentryError).toHaveBeenCalledWith('domain not verified', {
      context: 'EmailService',
      stack: error.stack,
      'error.name': 'Error',
    });
  });

  it('unpacks an Error passed alongside the message', () => {
    const error = new TypeError('bad argument');

    logger.warn('Enrichment failed', error, 'EnrichmentService');

    expect(sentryWarn).toHaveBeenCalledWith('Enrichment failed', {
      context: 'EnrichmentService',
      stack: error.stack,
      'error.name': 'TypeError',
    });
  });

  // A fatal is an error as far as anything reading these is concerned.
  it('forwards a fatal as an error', () => {
    logger.fatal('Out of memory', 'AppModule');

    expect(sentryError).toHaveBeenCalledWith('Out of memory', {
      context: 'AppModule',
    });
  });

  it('sends no context when Nest passed none', () => {
    logger.warn('Bare message');

    expect(sentryWarn).toHaveBeenCalledWith('Bare message', {});
  });

  // A logger that throws while reporting a failure destroys the record it was
  // called to make.
  it('survives Sentry throwing', () => {
    sentryWarn.mockImplementation(() => {
      throw new Error('transport down');
    });

    expect(() => logger.warn('still logged', 'Ctx')).not.toThrow();
  });
});
