const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: { type: String, required: true }

}, { versionKey: false, collection: 'Faculties' });

const Faculty = mongoose.model('Faculty', facultySchema, 'Faculties');

module.exports = Faculty;
