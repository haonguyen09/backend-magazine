const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    closureDate: { type: Date, required: true },
    finalClosureDate: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true }
}, { timestamps: true, versionKey: false, collection: 'Topics' });

const Topic = mongoose.model('Topic', topicSchema, 'Topics');

module.exports = Topic;