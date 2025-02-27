import { logger } from '../../../common/core/logger.ts';
import { transform } from './transformer/arm.transformer.ts';
import { getByAnilist, getByTvdb } from './remote/index.ts';
import { AnimeRelationId } from './types.ts';

export const getAniListRelationId = async (
  anilist?: number,
): Promise<AnimeRelationId | undefined> => {
  if (!anilist) {
    logger.warn('The parameter `anilist` is undefined');
    return undefined;
  }
  return await getByAnilist(anilist)
    .then(transform)
    .catch((e) => {
      logger.warn('Unable to get ids anilist from remote', e);
      return undefined;
    });
};

export const getRelationsByTvdb = async (
  tvdb?: number,
): Promise<AnimeRelationId[]> => {
  if (!tvdb) {
    logger.warn('The parameter `tvdb` is undefined');
    return [];
  }

  return await getByTvdb(tvdb)
    .then((data) => data.map(transform))
    .catch((e) => {
      logger.warn('Unable to get ids anilist from remote', e);
      return [];
    });
};
