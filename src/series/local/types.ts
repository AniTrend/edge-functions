import { Document } from 'mongo';
import { MediaWithSeason } from '../types.ts';

export interface MediaDocument extends Document, MediaWithSeason {
}

export interface MediaParamId {
  anilist: number;
}
