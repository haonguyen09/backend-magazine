const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'active' }, // e.g., active, inactive
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, { timestamps: true, versionKey: false, collection: 'Topics' });

const Topic = mongoose.model('Topic', topicSchema, 'Topics');

module.exports = Topic;
