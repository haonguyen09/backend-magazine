const Comment  = require("../models/CommentModel")
const mongoose = require('mongoose');

const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        if (!newComment) {
            return reject(new TypeError("New Comment data is required"));
        }

        const { title, content, document, user_id, submission_date, status, closure_date, final_closure_date , images, comments} = newComment;

        try {
            const existingComment = await Comment.findOne({ title });
            if (existingComment) {
                return resolve({
                    status: 'ERR',
                    message: 'title already exists'
                });
            }

            // Cast student_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid student ID format");
            }
            newComment.user_id = new mongoose.Types.ObjectId(user_id);

            // Validate and cast each image in the images array to ObjectId
            if (!images.every(image => mongoose.Types.ObjectId.isValid(image))) {
                throw new Error("Invalid image id format in termsOffered");
            }
            newComment.images = images.map(image => new mongoose.Types.ObjectId(image));

            // Validate and cast each comment in the comments array to ObjectId
            if (!comments.every(comment => mongoose.Types.ObjectId.isValid(comment))) {
                throw new Error("Invalid comment id format in termsOffered");
            }
            newComment.comments = comments.map(comment => new mongoose.Types.ObjectId(comment));

            const createdComment = await Comment.create(newComment);

            if (createdComment) {
                resolve({
                    status: 'OK',
                    message: 'Comment successfully created',
                    data: createdComment
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Comment',
                error: e.message
            });
        }
    });
};

const updateComment = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkComment = await Comment.findOne({
                id:id
            })
            if (checkComment !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Comment is already'
                })
            }

            const updateComment = await Comment.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateComment
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkComment = await Comment.findOne({
                id:id
            })
            if (checkComment !== null) {
                resolve({
                    status: 'OK',
                    message: 'The comment is already'
                })
            }

            await Comment.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete comment success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllComment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allComment = await Comment.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allComment
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comment = await Comment.findOne({
                _id:id
            })
            if (comment === null) {
                resolve({
                    status: 'OK',
                    message: 'The comment not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: comment
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllComment,
    getDetailsComment
}