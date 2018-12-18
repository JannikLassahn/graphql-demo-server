import DataLoader from 'dataloader';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import Movie from '../data/movie';
import Actor from '../data/actor';

export const movieLoader = () => new DataLoader(ids => mongooseLoader(Movie, ids));
export const actorLoader = () => new DataLoader(ids => mongooseLoader(Actor, ids));
