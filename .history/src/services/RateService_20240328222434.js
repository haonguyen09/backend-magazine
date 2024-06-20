const Rate  = require("../models/RateModel")
const mongoose = require('mongoose');

const createRate = (newRate) => {
    return new Promise(async (resolve, reject) => {
        if (!newRate) {
            return reject(new TypeError("New Rate data is required"));
        }

        const { user_id, article_id, rating} = newRate;

        try {

            // Cast user_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid student ID format");
            }
            newRate.user_id = new mongoose.Types.ObjectId(user_id);

            // Cast article_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(article_id)) {
                throw new Error("Invalid student ID format");
            }
            newRate.article_id = new mongoose.Types.ObjectId(article_id);


            const createdRate = await Rate.create(newRate);

            if (createdRate) {
                resolve({
                    status: 'OK',
                    message: 'Rate successfully created',
                    data: createdRate
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Rate',
                error: e.message
            });
        }
    });
};

const updateRate = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRate = await Rate.findOne({
                id:id
            })
            if (checkRate !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Rate is already'
                })
            }

            const updateRate = await Rate.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateRate
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteRate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRate = await Rate.findOne({
                id:id
            })
            if (checkRate !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Rate is already'
                })
            }

            await Rate.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete Rate success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllRate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allRate = await Rate.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allRate
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsRate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rate = await Rate.findOne({
                _id:id
            })
            if (rate === null) {
                resolve({
                    status: 'OK',
                    message: 'The rate not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: rate
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createRate,
    updateRate,
    deleteRate,
    getAllRate,
    getDetailsRate
}