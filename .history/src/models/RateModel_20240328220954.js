const ratingSchema = new Schema({
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true, versionKey: false, collection: 'Ratings' });

const Rating = mongoose.model('Rating', ratingSchema, 'Ratings');

module.exports = Rating