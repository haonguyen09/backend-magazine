const Topic  = require("../models/TopicModel")
const mongoose = require('mongoose');

const createTopic = (newTopic) => {
    return new Promise(async (resolve, reject) => {
        if (!newTopic) {
            return reject(new TypeError("New Topic data is required"));
        }

        const { title, description, startDate, closureDate, finalClosureDate, user_id } = newTopic;

        try {

            // Cast user_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid student ID format");
            }
            newTopic.user_id = new mongoose.Types.ObjectId(user_id);


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
                id:id
            })
            if (checkTopic !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Topic is already'
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
                id:id
            })
            if (checkTopic !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Topic is already'
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

const getDetailsTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id:id
            })
            if (topic === null) {
                resolve({
                    status: 'OK',
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
    getDetailsTopic
}