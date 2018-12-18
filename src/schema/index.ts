import { allMovies, movie, addMovie, addReview, Movie } from './movie.resolvers';
import Date from './date.resolvers';

export default {
    Movie,
    Date,
    Query: {
        allMovies,
        movie
    },
    Mutation: {
        addMovie,
        addReview
    }
}