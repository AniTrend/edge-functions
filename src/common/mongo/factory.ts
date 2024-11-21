import { MongoClient } from 'mongo';
import { logger } from '../core/logger.ts';
import { between } from 'optic';
import { env } from '../core/env.ts';
import { Local } from '../types/core.ts';

class LocalSourceFactory {
  constructor(private readonly client: MongoClient) {}

  connect = async (): Promise<Local> => {
    logger.mark('mongo_connection_start');
    return await this.client.connect(env<string>('MONGO_URL'))
      .then((client) => {
        logger.mark('mongo_connection_end');
        logger.measure(
          between('mongo_connection_start', 'mongo_connection_end'),
        );
        return client;
      })
      .catch((e: unknown) => {
        logger.error('common.mongo.factory:connect:', e);
        return undefined;
      });
  };

  disconnect = () => {
    logger.mark('mongo_close_start');
    try {
      this.client.close();
    } catch (e) {
      logger.error('common.mongo.factory:disconnect:', e);
    } finally {
      logger.mark('mongo_close_end');
      logger.measure(between('mongo_close_start', 'mongo_close_end'));
    }
  };
}

const _localSourceFactory = new LocalSourceFactory(
  new MongoClient(),
);

export default _localSourceFactory;
