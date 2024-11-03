import { IResponse } from './response.ts';

export interface IPaging<T> extends IResponse<T[]> {
  first?: string;
  last?: string;
  count: number;
}
