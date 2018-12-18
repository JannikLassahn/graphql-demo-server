import { Model } from 'mongoose';
import { Movie } from '../data/movie';
import { Actor } from '../data/actor';

interface Context {
    Movie: Model<Movie>
    Actor: Model<Actor>
}

export async function search(_, args, { Movie, Actor }: Context) {
    const { first, last, before, after, query, searchType } = args;

    if (searchType === 'ACTOR') {

    }

    else if (searchType === 'MOVIE') {

    }
}

export function __resolveType(obj, context, info) {
    if (obj.name) {
        return 'Actor';
    }

    if (obj.title) {
        return 'Movie';
    }

    return null;
}