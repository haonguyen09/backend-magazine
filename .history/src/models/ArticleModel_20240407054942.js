const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    document: { type: String, required: true },
    htmlDocx: { type: String, required: false },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submission_date: { type: Date, required: true },
    status: { type: String, default: 'pending' },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    views: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true } 
}, { timestamps: true, versionKey: false, collection: 'Articles' });

const Article = mongoose.model('Article', articleSchema, 'Articles');

module.exports = Article
