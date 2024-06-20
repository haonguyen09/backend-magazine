const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    file_path: { type: String, required: true },
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true }
}, { timestamps: true,  versionKey: false, collection: 'Images' });

const Image = mongoose.model('Image', imageSchema, 'Images');

module.exports = Image;
