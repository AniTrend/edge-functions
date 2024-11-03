import { Document } from 'npm/mongodb';
import { MediaWithSeason } from '../types.ts';

export interface MediaDocument extends Document, MediaWithSeason {
}

export interface MediaParamId {
  anilist: number;
}
