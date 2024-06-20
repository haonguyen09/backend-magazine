const ImageService = require('../services/ImageService')

const createImage = async(req, res) => {
    try {
        const { file_path, article_id} = req.body;
        
        if (!file_path || !article_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }
        const response = await ImageService.createImage(req.body);
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

const updateImage = async(req, res) => {
    try {
        const ImageId = req.params.id
        const data = req.body
        if (!ImageId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ImageId is required'
            })
        }
        const response = await ImageService.updateImage(ImageId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('control', e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteImage = async(req, res) => {
    try {
        const ImageId = req.params.id
        // const token = req.headers
        if (!ImageId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ImageId is required'
            })
        }
        const response = await ImageService.deleteImage(ImageId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllImage = async(req, res) => {
    try {
        const response = await ImageService.getAllImage()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsImage = async (req, res) => {
    try {
        const ImageId = req.params.id
        if (!ImageId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ImageId is required'
            })
        }
        const response = await ImageService.getDetailsImage(ImageId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createImage,
    updateImage,
    deleteImage,
    getAllImage,
    getDetailsImage
}