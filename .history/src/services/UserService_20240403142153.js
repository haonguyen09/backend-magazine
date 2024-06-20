const mongoose = require('mongoose');
const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        if (!newUser) {
            return reject(new TypeError("New user data is required"));
        }

        const { username, avatar, password, role, email, first_name, last_name, faculty_id } = newUser;

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return resolve({
                    status: 'ERR',
                    message: 'Username already exists'
                });
            }

            // Check for existing email
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return resolve({
                    status: 'ERR',
                    message: 'Email already exists'
                });
            }

            // Cast faculty_id to a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(faculty_id)) {
                throw new Error("Invalid faculty ID format");
            }
            newUser.faculty_id = new mongoose.Types.ObjectId(faculty_id);

            const hashedPassword = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                username,
                avatar,
                password: hashedPassword,
                role,
                email,
                first_name,
                last_name,
                faculty_id
            });

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'User successfully created',
                    data: createdUser
                });
            }
        } catch (e) {
            console.log('service', e)

            reject({
                status: 'ERR',
                message: 'Error creating user',
                error: e.message
            });
        }
    });
};




const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        if (!userLogin) {
            return reject(new TypeError("userLogin object is undefined"));
        }
        const { password, email } = userLogin
        
        try {
            
            const checkUser = await User.findOne({email})
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }

            const access_token =  await generalAccessToken({
                id: checkUser.id,
                role: checkUser.role
            })


            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                role: checkUser.role
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: {
                    checkUser,
                    access_token,
                    refresh_token
                }
            })

        } catch (e) {
            reject(e)
        }
    })
}








const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id
            })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            // await User.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id:id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user not defined'
                })
            }


            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}




module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}