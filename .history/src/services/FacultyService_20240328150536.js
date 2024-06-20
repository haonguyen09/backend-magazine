const Faculty  = require("../models/FacultyModel")
const mongoose = require('mongoose');

const createFaculty = (newFaculty) => {
    return new Promise(async (resolve, reject) => {
        if (!newFaculty) {
            return reject(new TypeError("New Faculty data is required"));
        }

        const { title, content, document, user_id, submission_date, status, closure_date, final_closure_date , images, comments} = newFaculty;

        try {
            const existingFaculty = await Faculty.findOne({ title });
            if (existingFaculty) {
                return resolve({
                    status: 'ERR',
                    message: 'title already exists'
                });
            }

            // Cast student_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid student ID format");
            }
            newFaculty.user_id = new mongoose.Types.ObjectId(user_id);

            // Validate and cast each image in the images array to ObjectId
            if (!images.every(image => mongoose.Types.ObjectId.isValid(image))) {
                throw new Error("Invalid image id format in termsOffered");
            }
            newFaculty.images = images.map(image => new mongoose.Types.ObjectId(image));

            // Validate and cast each comment in the comments array to ObjectId
            if (!comments.every(comment => mongoose.Types.ObjectId.isValid(comment))) {
                throw new Error("Invalid comment id format in termsOffered");
            }
            newFaculty.comments = comments.map(comment => new mongoose.Types.ObjectId(comment));

            const createdFaculty = await Faculty.create(newFaculty);

            if (createdFaculty) {
                resolve({
                    status: 'OK',
                    message: 'Faculty successfully created',
                    data: createdFaculty
                });
            }
        } catch (e) {

            reject({
                status: 'ERR',
                message: 'Error creating Faculty',
                error: e.message
            });
        }
    });
};

const updateFaculty = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFaculty = await Faculty.findOne({
                id:id
            })
            if (checkFaculty !== null) {
                resolve({
                    status: 'OK',
                    message: 'The Faculty is already'
                })
            }

            const updateFaculty = await Faculty.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateFaculty
            })
        } catch (e) {
            console.log('service', e)
            reject(e)
        }
    })
}

const deleteFaculty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFaculty = await Faculty.findOne({
                id:id
            })
            if (checkFaculty !== null) {
                resolve({
                    status: 'OK',
                    message: 'The faculty is already'
                })
            }

            await Faculty.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete faculty success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllFaculty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allFaculty = await Faculty.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allFaculty
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsFaculty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const faculty = await Faculty.findOne({
                _id:id
            })
            if (faculty === null) {
                resolve({
                    status: 'OK',
                    message: 'The faculty not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: faculty
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getAllFaculty,
    getDetailsFaculty
}