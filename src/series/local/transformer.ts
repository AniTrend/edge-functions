import { Transform } from '../../common/transformer/types.ts';
import { MediaEntity } from '../types.ts';
import { idOf, Optional } from '../../common/mongo/index.ts';
import { MediaDocument } from './types.ts';

const map = (
  document: MediaDocument,
): Optional<MediaEntity> => {
  return {
    id: idOf(document._id),
    mediaId: document.mediaId,
    cover: document.cover,
    banner: document.banner,
    fanart: document.fanart,
    format: document.format,
    status: document.status,
    source: document.source,
    title: document.title,
    themeSongs: document.themeSongs,
    schedule: document.schedule,
    ageRating: document.ageRating,
    isAdult: document.isAdult,
    trailers: document.trailers,
    networks: document.networks,
    image: document.image,
    homepage: document.homepage,
    description: document.description,
    updatedAt: document.updatedAt,
    airedEpisodes: document.airedEpisodes,
    seasons: document.seasons,
  };
};

export const transform: Transform<
  Optional<MediaDocument>,
  Optional<MediaEntity>
> = (sourceData) => sourceData ? map(sourceData) : undefined;
