const FacultyService = require('../services/FacultyService')

const createFaculty = async(req, res) => {
    try {
        const { name} = req.body;
        
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }
        const response = await FacultyService.createFaculty(req.body);
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

const updateFaculty = async(req, res) => {
    try {
        const FacultyId = req.params.id
        const data = req.body
        if (!FacultyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FacultyId is required'
            })
        }
        const response = await FacultyService.updateFaculty(FacultyId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('control', e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFaculty = async(req, res) => {
    try {
        const FacultyId = req.params.id
        // const token = req.headers
        if (!FacultyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FacultyId is required'
            })
        }
        const response = await FacultyService.deleteFaculty(FacultyId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllFaculty = async(req, res) => {
    try {
        const response = await FacultyService.getAllFaculty()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsFaculty = async (req, res) => {
    try {
        const FacultyId = req.params.id
        if (!FacultyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FacultyId is required'
            })
        }
        const response = await FacultyService.getDetailsFaculty(FacultyId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getAllFaculty,
    getDetailsFaculty
}