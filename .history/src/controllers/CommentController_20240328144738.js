const CommentService = require('../services/CommentService')

const createComment = async(req, res) => {
    try {
        const { title, content, document, student_id, submission_date, status, closure_date, final_closure_date , images, comments} = req.body;
        
        if (!title || !content || !document || !student_id || !submission_date || !status || !closure_date || !final_closure_date || !Array.isArray(images) || !Array.isArray(comments)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }
        const response = await CommentService.createComment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log('controller', e)
        return res.status(500).json({
            status: 'ERR',
            message: 'Server error',
            error: e.message
        });
    }
};

const updateComment = async(req, res) => {
    try {
        const CommentId = req.params.id
        const data = req.body
        if (!CommentId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommentId is required'
            })
        }
        const response = await CommentService.updateComment(CommentId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('control', e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteComment = async(req, res) => {
    try {
        const CommentId = req.params.id
        // const token = req.headers
        if (!CommentId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommentId is required'
            })
        }
        const response = await CommentService.deleteComment(CommentId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllComment = async(req, res) => {
    try {
        const response = await CommentService.getAllComment()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsComment = async (req, res) => {
    try {
        const CommentId = req.params.id
        if (!CommentId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CommentId is required'
            })
        }
        const response = await CommentService.getDetailsComment(CommentId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllComment,
    getDetailsComment
}