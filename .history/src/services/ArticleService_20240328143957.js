const Article  = require("../models/ArticleModel")
const mongoose = require('mongoose');

const createArticle = (newArticle) => {
    return new Promise(async (resolve, reject) => {
        if (!newArticle) {
            return reject(new TypeError("New Article data is required"));
        }

        const { title, content, document, student_id, submission_date, status, closure_date, final_closure_date , images, comments} = newArticle;

        try {
            const existingArticle = await Article.findOne({ title });
            if (existingArticle) {
                return resolve({
                    status: 'ERR',
                    message: 'title already exists'
                });
            }

            // Cast student_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(student_id)) {
                throw new Error("Invalid student ID format");
            }
            newArticle.student_id = new mongoose.Types.ObjectId(student_id);

            // Validate and cast each image in the images array to ObjectId
            if (!images.every(image => mongoose.Types.ObjectId.isValid(image))) {
                throw new Error("Invalid image id format in termsOffered");
            }
            newArticle.images = images.map(image => new mongoose.Types.ObjectId(image));

            // Validate and cast each comment in the comments array to ObjectId
            if (!comments.every(comment => mongoose.Types.ObjectId.isValid(comment))) {
                throw new Error("Invalid comment id format in termsOffered");
            }
            newArticle.comments = comments.map(comment => new mongoose.Types.ObjectId(comment));

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
                    message: 'The article is already'
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
                    message: 'The article is already'
                })
            }

            await Article.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete article success',
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