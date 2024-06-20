const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String },    
    password: { type: String, required: true },    
    email: { type: String, required: true },     
    first_name: { type: String, required: true },     
    last_name: { type: String, required: true },     
    role: { type: String, required: true },     
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true }
}, { timestamps: true,  versionKey: false, collection: 'Comments' });

const Comment = mongoose.model('Comment', userSchema, 'Comments');

module.exports = Comment;
