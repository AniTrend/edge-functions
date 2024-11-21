import { Document, ObjectId } from 'mongo';
import { ProjectionOption, SortOption } from './types.ts';

export const projectionOf = <T extends Document>(
  projection: ProjectionOption<T>,
) => projection;

export const sortOf = <T extends Document>(option: SortOption<T>) => option;

export const idOf = (id: ObjectId): string => id.toHexString();
