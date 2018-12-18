import { Schema, model, Document } from 'mongoose';

export interface Movie extends Document {
    title: String
    description: String
    createdAt: Date
    updatedAt: Date
    releasedAt: Date
    genres: [String]
    runtime: Number
    averageRating: Number
    reviews: [
        {
            title: String,
            content: String,
            rating: Number,
            createdAt: Date
        }
    ]
}

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    releasedAt: Date,
    genres: [String],
    runtime: Number,
    averageRating: Number,
    reviews: [
        {
            title: String,
            content: String,
            rating: Number,
            createdAt: Date
        }
    ]
});

movieSchema.virtual('id', function (this) { return this._id });
movieSchema.set('toObject', { virtuals: true });

const movieModel = model<Movie>('movie', movieSchema);
export default movieModel;