const Image  = require("../models/ImageModel")
const mongoose = require('mongoose');

const createImage = (newImage) => {
    return new Promise(async (resolve, reject) => {
        if (!newImage) {
            return reject(new TypeError("New Image data is required"));
        }

        const { file_path, article_id} = newImage;

        try {


            // Cast article_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(article_id)) {
                throw new Error("Invalid student ID format");
            }
            newImage.article_id = new mongoose.Types.ObjectId(article_id);


            const createdImage = await Image.create(newImage);

            if (createdImage) {
                resolve({
                    status: 'OK',
                    message: 'Image successfully created',
                    data: createdImage
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Image',
                error: e.message
            });
        }
    });
};

const updateImage = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkImage = await Image.findOne({
                id:id
            })
            if (checkImage !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Image is already'
                })
            }

            const updateImage = await Image.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateImage
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteImage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkImage = await Image.findOne({
                id:id
            })
            if (checkImage !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Image is already'
                })
            }

            await Image.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete Image success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllImage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allImage = await Image.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allImage
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsImage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Image = await Image.findOne({
                _id:id
            })
            if (Image === null) {
                resolve({
                    status: 'OK',
                    message: 'The Image not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: Image
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createImage,
    updateImage,
    deleteImage,
    getAllImage,
    getDetailsImage
}