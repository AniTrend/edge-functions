import { News, NewsEntity } from './types.ts';
import { NewsDocument } from './local/types.ts';
import { idOf } from '../common/mongo/index.ts';

export const toEntity = (data: NewsDocument): NewsEntity => {
  return {
    id: idOf(data._id),
    slug: data.slug,
    title: data.title,
    author: data.author,
    category: data.category,
    description: data.description,
    content: data.content,
    image: data.image,
    publishedOn: data.published_on,
    link: data.link,
  };
};

export const toDocument = (data: News): NewsDocument => {
  return {
    slug: data.slug,
    title: data.title,
    author: data.author,
    category: data.category,
    description: data.description,
    content: data.content,
    image: data.image,
    published_on: data.publishedOn,
    link: data.link,
  };
};
