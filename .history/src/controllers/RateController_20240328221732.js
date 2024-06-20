const RateService = require('../services/RateService')

const createRate = async(req, res) => {
    try {
        const { user_id, article_id, rating} = req.body;
        
        if (!user_id || !rating || !article_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }
        const response = await RateService.createRate(req.body);
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

const updateRate = async(req, res) => {
    try {
        const RateId = req.params.id
        const data = req.body
        if (!RateId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The RateId is required'
            })
        }
        const response = await RateService.updateRate(RateId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('control', e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteRate = async(req, res) => {
    try {
        const RateId = req.params.id
        // const token = req.headers
        if (!RateId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The RateId is required'
            })
        }
        const response = await RateService.deleteRate(RateId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllRate = async(req, res) => {
    try {
        const response = await RateService.getAllRate()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsRate = async (req, res) => {
    try {
        const RateId = req.params.id
        if (!RateId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The RateId is required'
            })
        }
        const response = await RateService.getDetailsRate(RateId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createRate,
    updateRate,
    deleteRate,
    getAllRate,
    getDetailsRate
}