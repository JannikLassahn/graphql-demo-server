import { Schema, model, Document } from 'mongoose';

export interface Actor extends Document {
    firstName: String,
    lastName: String
}

const actorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: String,
    birthday: Date,
});


actorSchema.virtual('id', function (this) { return this._id });
actorSchema.set('toObject', { virtuals: true });

const actorModel = model<Actor>('actor', actorSchema);
export default actorModel;