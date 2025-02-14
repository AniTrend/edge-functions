import { Document } from '@mongodb';
import { MediaWithSeason } from '../types.ts';

export interface MediaDocument extends Document, MediaWithSeason {
}

export interface MediaParamId {
  anilist: number;
}
