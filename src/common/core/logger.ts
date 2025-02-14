import { ConsoleStream, Level, Logger } from '@optic';
import { TokenReplacer } from '@optic/formatters';
import { LogtailStream } from '../logger/logtail.ts';
import { env } from './env.ts';
import { MinLogLevel } from '../logger/types.ts';

const consoleLogger = new ConsoleStream()
  .withFormat(
    new TokenReplacer()
      .withFormat('{msg} {metadata}')
      .withColor(),
  );

const betterStackLogger = new LogtailStream(
  env<string>('LOGTAIL_KEY'),
);

const logLevel = (level: MinLogLevel): Level => {
  switch (level) {
    case 'DEBUG':
      return Level.Debug;
    case 'INFO':
      return Level.Info;
    case 'WARN':
      return Level.Warn;
    case 'ERROR':
      return Level.Error;
    default:
      throw new Error('Unkown log level', { cause: level });
  }
};

const logger = new Logger()
  .withMinLogLevel(
    logLevel(env<MinLogLevel>('MIN_LOG_LEVEL')),
  )
  .addStream(consoleLogger)
  .addStream(betterStackLogger);

logger.profilingConfig()
  .enabled(env<boolean>('OPTIC_TRACING'))
  .captureMemory(true)
  .withLogLevel(Level.Info);

export { logger };
