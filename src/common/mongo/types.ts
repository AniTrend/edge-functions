import { Document } from 'mongo';

export type Optional<T extends Document> = T | undefined | null;

export type ProjectionOption<T extends Document> = {
  [K in keyof T]?: 0 | 1;
};

export type SortOption<T extends Document> = {
  [K in keyof T]?: 1 | -1 | 'asc' | 'desc';
};

export interface EntityCursor {
  cursor: string;
}
