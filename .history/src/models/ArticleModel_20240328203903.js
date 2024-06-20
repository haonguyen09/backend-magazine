const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    document: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submission_date: { type: Date, required: true },
    status: { type: String, default: 'pending' },
    closure_date: { type: Date, required: true },
    final_closure_date: { type: Date, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

}, { timestamps: true,  versionKey: false, collection: 'Articles' });

const Article = mongoose.model('Article', articleSchema, 'Articles');

module.exports = Article;
