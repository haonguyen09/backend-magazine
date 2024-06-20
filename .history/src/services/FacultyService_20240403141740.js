const Faculty  = require("../models/FacultyModel")

const createFaculty = (newFaculty) => {
    return new Promise(async (resolve, reject) => {
        if (!newFaculty) {
            return reject(new TypeError("New Faculty data is required"));
        }

        const { name } = newFaculty;

        try {
            const existingFaculty = await Faculty.findOne({ name });
            if (existingFaculty) {
                return resolve({
                    status: 'ERR',
                    message: 'name already exists'
                });
            }

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
                _id:id
            })
            if (checkFaculty === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Faculty is not defined'
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
                _id:id
            })
            if (checkFaculty === null) {
                resolve({
                    status: 'ERR',
                    message: 'The faculty is not defined'
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