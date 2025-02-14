import { Context } from '@oak';
import { State } from './state.ts';
import { GrowthBook } from '@growthbook';
import { Db } from '@mongodb';
import { AppFeatures } from '../experiment/types.ts';

export type RCF822Date = string;

export type ErrorResponse = {
  message: string;
};

export type AppContext = Context<State>;

export type Features = GrowthBook<AppFeatures>;

export type Local = Db | undefined;
