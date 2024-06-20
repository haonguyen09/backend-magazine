const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String },    
    avatar: { type: String, required: true },
    password: { type: String, required: true },    
    email: { type: String, required: true },     
    first_name: { type: String, required: true },     
    last_name: { type: String, required: true },     
    role: { type: String, required: true },     
    faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true }
}, { timestamps: true,  versionKey: false, collection: 'Users' });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
