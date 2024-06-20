const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    submission_date: { type: Date, required: true }

}, { timestamps: true,  versionKey: false, collection: 'Comments' });

const Comment = mongoose.model('Comment', commentSchema, 'Comments');

module.exports = Comment;
