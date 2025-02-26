import { between } from '@optic';
import { logger } from '../core/logger.ts';
import type { AppContext } from '../types/core.ts';
import { env } from '../core/env.ts';

export default async (
  { state }: AppContext,
  next: () => Promise<unknown>,
) => {
  logger.mark('load-features-start');
  
  try {
    const { error, source } = await state.features.init({
      timeout: env<number>('GROWTH_TIME_OUT'),
    });

    if (error) {
      logger.error(
        'common.middleware.growth: GrowthBook init error',
        error,
      );
    } else {
      logger.info(
        'common.middleware.growth: GrowthBook init complete',
        source,
      );
    }
  } catch (e) {
    logger.error(
      'common.middleware.growth: Failed to load features from GrowthBook',
      e,
    );
  } finally {
    logger.mark('load-features-end');
    logger.measure(between('load-features-start', 'load-features-end'));
  }

  try {
    await next();
  } finally {
    try {
      logger.mark('destory-growth-start');
      state.features.destroy();
    } catch (e) {
      logger.error('common.middleware.growth: Failed to destroy GrowthBook', e);
    } finally {
      logger.mark('destory-growth-end');
      logger.measure(between('destory-growth-start', 'destory-growth-end'));
    }
  }
};
