import { allMovies, movie, addMovie, addReview } from './movie.resolvers';
import Date from './date.resolvers';

export default {
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