import { ValidationError } from 'apollo-server';
import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader';
import { connectionFromArray } from 'graphql-relay';

const load = async (context, id) => {
    if (!id) {
        return null;
    }

    try {
        return await context.loaders.movieLoader.load(id);
    } catch (error) {
        return null;
    }
}

export const allMovies = async (_, args, context) => {

    const movies = context.Movie.find({});
    return connectionFromMongoCursor({
        cursor: movies,
        context,
        args,
        loader: load
    });
}

export const movie = async (_, { id }, { loaders }) => {
    const movie = await loaders.movieLoader.load(id)
    return movie || new ValidationError('Movie ID not found');
}

export const addMovie = async (_, { input }, { Movie }) => {
    const { title, releasedAt, description, genres, runtime } = input;
    const movie = new Movie({
        title,
        description,
        releasedAt,
        createdAt: Date.now(),
        genres,
        runtime
    });

    await movie.save();
    return movie;
}

export const deleteMovie = async (_, { movieId }, { Movie }) => {
    const movie = await Movie.findByIdAndDelete(movieId);
    return movie !== null;
}

export const addReview = async (_, { input }, { Movie }) => {
    const { movieId, title, content, rating } = input;
    const movie = await Movie.findById(movieId);
    if (!movie) {
        return new ValidationError('Movie ID not found');
    }

    if (rating < 1 || rating > 10) {
        return new ValidationError('Ratings must be between 1 and 10');
    }

    const review = {
        createdAt: new Date(),
        title,
        content,
        rating
    }
    movie.reviews.push(review);
    movie.save();

    return review;
}

export const Movie = {
    reviews: (movie, args) => connectionFromArray(movie.reviews, args)
}