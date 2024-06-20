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
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, { timestamps: true,  versionKey: false, collection: 'Users' });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
