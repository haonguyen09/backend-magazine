const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String },    
    avatar: { type: String },
    password: { type: String, required: true },    
    email: { type: String, required: true },     
    first_name: { type: String, required: true },     
    last_name: { type: String, required: true },     
    role: { type: String, required: true },     
    faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    articlePosts: [{
        topic_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
        article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true }
    }],
    articleRatings: [{
        article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }
    }]
}, { timestamps: true,  versionKey: false, collection: 'Users' });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
