const Topic  = require("../models/TopicModel")
const mongoose = require('mongoose');

const createTopic = (newTopic) => {
    return new Promise(async (resolve, reject) => {
        if (!newTopic) {
            return reject(new TypeError("New Topic data is required"));
        }

        const { title, description, startDate, closureDate, finalClosureDate, user_id, faculty_id} = newTopic;

        try {

            const existingTopic = await Topic.findOne({ title });
            if (existingTopic) {
                return resolve({
                    status: 'ERR',
                    message: 'title already exists'
                });
            }

            // Cast user_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid user ID format");
            }
            newTopic.user_id = new mongoose.Types.ObjectId(user_id);

            // Cast faculty_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(faculty_id)) {
                throw new Error("Invalid faculty ID format");
            }
            newTopic.faculty_id = new mongoose.Types.ObjectId(faculty_id);


            const createdTopic = await Topic.create(newTopic);

            if (createdTopic) {
                resolve({
                    status: 'OK',
                    message: 'Topic successfully created',
                    data: createdTopic
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Topic',
                error: e.message
            });
        }
    });
};

const updateTopic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTopic = await Topic.findOne({
                _id:id
            })
            if (checkTopic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Topic is not defined'
                })
            }

            const updateTopic = await Topic.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateTopic
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTopic = await Topic.findOne({
                _id:id
            })
            if (checkTopic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Topic is not defined'
                })
            }

            await Topic.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete Topic success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTopic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allTopic = await Topic.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allTopic
            })
        } catch (e) {
            reject(e)
        }
    })
}



const getPaginationTopic = async (limit = 4, page = 0, filterFaculty, filterTitle) => {
    try {
        const totalTopics = await Topic.countDocuments()
        const queryConditions = {};
        if (filterFaculty) {
            queryConditions[filterFaculty[0]] = filterFaculty[1];
        }
        if (filterTitle) {
            queryConditions[filterTitle[0]] = { '$regex': filterTitle[1], '$options': 'i' };
        }

        const totalTopicsFilter = await Topic.countDocuments(queryConditions);
        const topics = await Topic.find(queryConditions)
            .limit(limit)
            .skip(page * limit);

        return {
            status: 'OK',
            message: 'Success',
            data: topics,
            total: totalTopics,
            totalFilter: totalTopicsFilter,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalTopicsFilter / limit),
        };
    } catch (e) {
        console.error('Error in getPaginationTopic:', e);
        throw new Error('Failed to retrieve topics');
    }
}



const getDetailsTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id:id
            })
            if (topic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The topic not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: topic
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createTopic,
    updateTopic,
    deleteTopic,
    getAllTopic,
    getDetailsTopic,
    getPaginationTopic
}