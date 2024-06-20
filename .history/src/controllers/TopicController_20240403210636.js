const TopicService = require('../services/TopicService')

const createTopic = async(req, res) => {
    try {

        const { title, description, startDate, closureDate, finalClosureDate, user_id} = req.body;
        
        if (!title || !description || !startDate || !closureDate || !user_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }

        const start = new Date(startDate);
        const closure = new Date(closureDate);
        const finalClosure = new Date(finalClosureDate);

        // Validate date logic
        if (start >= closure || closure >= finalClosure) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Dates must be logically ordered: startDate < closureDate < finalClosureDate'
            });
        }

        const response = await TopicService.createTopic(req.body);
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

const updateTopic = async(req, res) => {
    try {
        const TopicId = req.params.id
        const data = req.body
        if (!TopicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The TopicId is required'
            })
        }
        const response = await TopicService.updateTopic(TopicId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('control', e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTopic = async(req, res) => {
    try {
        const TopicId = req.params.id
        // const token = req.headers
        if (!TopicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The TopicId is required'
            })
        }
        const response = await TopicService.deleteTopic(TopicId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTopic = async(req, res) => {
    try {
        const response = await TopicService.getAllTopic()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsTopic = async (req, res) => {
    try {
        const TopicId = req.params.id
        if (!TopicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The TopicId is required'
            })
        }
        const response = await TopicService.getDetailsTopic(TopicId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createTopic,
    updateTopic,
    deleteTopic,
    getAllTopic,
    getDetailsTopic
}