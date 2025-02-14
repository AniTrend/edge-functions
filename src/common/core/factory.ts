import { Application, Router } from '@oak';
import { FactoryOptions } from '../types/options.ts';
import { createState } from './setup.ts';
import timing from '../middleware/timing.ts';
import error from '../middleware/error.ts';
import growth from '../middleware/growth.ts';
import header from '../middleware/header.ts';
import targeting from '../middleware/targeting.ts';
import { logger } from './logger.ts';
import { between } from '@optic';

export default async (opts: FactoryOptions): Promise<Application> => {
  const app = new Application({
    state: await createState(),
    contextState: 'prototype',
  });

  logger.mark('factory-start');
  const router = opts.router ?? new Router();

  app.use(
    timing,
    header,
    growth,
    targeting,
    error,
  );

  app.addEventListener('error', (event) => {
    logger.critical(
      'common.core.factory:error: Uncaught application exception',
      event.error,
    );
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  logger.mark('factory-end');
  logger.measure(between('factory-start', 'factory-end'));
  return app;
};
