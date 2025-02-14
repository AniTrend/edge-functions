import { AppContext, ErrorResponse } from '../common/types/core.ts';
import { ConfigRepository } from './repository/index.ts';
import { LocalSource } from './local/index.ts';
import { collection } from '../common/mongo/index.ts';
import { Status } from '@oak';

export const config = async ({ state, response }: AppContext) => {
  const localSource = new LocalSource(collection('config', state.local));
  const repository = new ConfigRepository(
    state.features,
    localSource,
  );
  const configuration = await repository.getConfiguration();

  response.type = 'application/json';
  if (configuration) {
    response.status = Status.OK;
    response.body = await repository.getConfiguration();
  } else {
    response.status = Status.InternalServerError;
    response.body = <ErrorResponse> {
      message: 'An error occured while fetching configuration',
    };
  }
};
