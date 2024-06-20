const Comment  = require("../models/CommentModel")
const mongoose = require('mongoose');

const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        if (!newComment) {
            return reject(new TypeError("New Comment data is required"));
        }

        const { content, user_id, article_id, submission_date} = newComment;

        try {

            // Cast user_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid student ID format");
            }
            newComment.user_id = new mongoose.Types.ObjectId(user_id);

            // Cast article_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(article_id)) {
                throw new Error("Invalid student ID format");
            }
            newComment.article_id = new mongoose.Types.ObjectId(article_id);


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
                _id:id
            })
            if (checkComment === null) {
                resolve({
                    status: 'OK',
                    message: 'The Comment is not defined'
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
            if (checkComment === null) {
                resolve({
                    status: 'ERR',
                    message: 'The comment is not defined'
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