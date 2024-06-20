const TopicService = require('../services/TopicService')

const createTopic = async(req, res) => {
    try {

        const { title, description, startDate, closureDate, finalClosureDate, user_id, faculty_id} = req.body;
        
        if (!title || !description || !startDate || !closureDate  || !finalClosureDate || !user_id || !faculty_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }

        const start = new Date(startDate);
        const closure = new Date(closureDate);
        const finalClosure = new Date(finalClosureDate);

        // Validate date logic
        if (start >= closure >= finalClosure) {
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
        const TopicId = req.params.id;
        const data = req.body;

        if (!TopicId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The TopicId is required'
            });
        }

        // Destructuring dates from the body to validate
        const { startDate, closureDate, finalClosureDate } = data;

        // Convert date strings to Date objects
        const start = new Date(startDate);
        const closure = new Date(closureDate);
        const finalClosure = new Date(finalClosureDate);

        // Validate date logic
        if (!(start < closure && closure < finalClosure)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Dates must be logically ordered: startDate < closureDate < finalClosureDate'
            });
        }

        // If validation passes, update the topic
        const response = await TopicService.updateTopic(TopicId, data);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error updating topic', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while updating the topic'
        });
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

const getPaginationTopic = async (req, res) => {
    const { limit, page, filterFaculty, filterTitle } = req.query;
    try {
        const response = await TopicService.getPaginationTopic(Number(limit), Number(page), filterFaculty, filterTitle);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Pagination Error:', error);
        return res.status(500).json({
            message: 'Error fetching paginated topics',
            error: error.message
        });
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
    getDetailsTopic,
    getPaginationTopic
}