const Article  = require("../models/ArticleModel")
const mongoose = require('mongoose');

const createArticle = (newArticle) => {
    return new Promise(async (resolve, reject) => {
        if (!newArticle) {
            return reject(new TypeError("New Article data is required"));
        }

        const { title, description, departmentId, credits, instructors, termsOffered, totalSlots } = newArticle;

        try {
            const existingArticle = await Article.findOne({ title });
            if (existingArticle) {
                return resolve({
                    status: 'ERR',
                    message: 'title already exists'
                });
            }

            // Cast departmentId to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(departmentId)) {
                throw new Error("Invalid department ID format");
            }
            newArticle.departmentId = new mongoose.Types.ObjectId(departmentId);

            // Validate and cast each term ID in the termsOffered array to ObjectId
            if (!termsOffered.every(term => mongoose.Types.ObjectId.isValid(term))) {
                throw new Error("Invalid term ID format in termsOffered");
            }
            newArticle.termsOffered = termsOffered.map(term => new mongoose.Types.ObjectId(term));

            const createdArticle = await Article.create(newArticle);

            if (createdArticle) {
                resolve({
                    status: 'OK',
                    message: 'Article successfully created',
                    data: createdArticle
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Article',
                error: e.message
            });
        }
    });
};

const updateArticle = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await Article.findOne({
                id:id
            })
            if (checkArticle !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Article is already'
                })
            }

            const updateArticle = await Article.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateArticle
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await Article.findOne({
                id:id
            })
            if (checkArticle !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Article is already'
                })
            }

            await Article.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete Article success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllArticle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allArticle = await Article.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allArticle
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsArticle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const article = await Article.findOne({
                _id:id
            })
            if (article === null) {
                resolve({
                    status: 'OK',
                    message: 'The article not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: article
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticle,
    getDetailsArticle
}