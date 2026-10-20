import { ConsoleLogger } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

// Nest's ConsoleLogger writes with `process.stdout.write`, never through
// `console.*`, so Sentry's console integration sees none of it. Without this
// subclass every `this.logger.warn(...)` and `this.logger.error(...)` would be
// invisible to Better Stack, including failures a request recovered from.
//
// Warn and above only. Info and debug are the bulk of the output and would
// eat the free plan's ingest.
export class SentryForwardingLogger extends ConsoleLogger {
  warn(message: unknown, ...rest: unknown[]): void {
    super.warn(message as string, ...(rest as [string]));
    this.forward('warn', message, rest);
  }

  error(message: unknown, ...rest: unknown[]): void {
    super.error(message as string, ...(rest as [string]));
    this.forward('error', message, rest);
  }

  fatal(message: unknown, ...rest: unknown[]): void {
    super.fatal(message as string, ...(rest as [string]));
    this.forward('error', message, rest);
  }

  // `logger.error(message, stack, context)` is the shape Nest documents, and
  // the stack is the whole reason anyone opens the log line. Dropping it
  // leaves a generic message and nothing to act on, so it is pulled out of
  // whichever argument carries it -- an `Error` anywhere in the call, or the
  // pre-formatted string Nest passes before the context.
  private forward(
    level: 'warn' | 'error',
    message: unknown,
    rest: unknown[],
  ): void {
    try {
      const error =
        message instanceof Error
          ? message
          : rest.find((value): value is Error => value instanceof Error);

      const strings = rest.filter(
        (value): value is string => typeof value === 'string',
      );

      // Both the stack and the context arrive as strings, and only their shape
      // tells them apart: a stack carries frames, a context is a class name.
      const stack = error?.stack ?? strings.find(isStackTrace);
      const context = strings.filter((value) => !isStackTrace(value)).at(-1);

      Sentry.logger[level](
        message instanceof Error ? message.message : String(message),
        {
          ...(context && { context }),
          ...(stack && { stack }),
          ...(error && { 'error.name': error.name }),
        },
      );
    } catch {
      // Reporting must never be the reason a request fails.
    }
  }
}

const isStackTrace = (value: string): boolean => /\n\s*at\s/.test(value);
