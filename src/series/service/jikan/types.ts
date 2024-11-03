import { AnimeResource, MangaResource } from './remote/types.ts';

export type JikanAnime = AnimeResource;

export type JikanManga = MangaResource;

export type Jikan = JikanAnime | JikanManga;
