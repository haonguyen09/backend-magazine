const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: { type: String, required: true }

}, { timestamps: true,  versionKey: false, collection: 'Faculties' });

const Faculty = mongoose.model('Faculty', facultySchema, 'Faculties');

module.exports = Faculty;
