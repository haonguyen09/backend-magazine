const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async(req, res) => {
    try {
        const { username, avatar, password, role, email, first_name, last_name, faculty_id } = req.body;
        
        // Regular expression for email validation
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password || !role || !first_name || !last_name || !faculty_id ) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        }
        const response = await UserService.createUser(req.body);
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            })
        } 
        const response = await UserService.loginUser(req.body)
        console.log('response', response)
        if (response.error) {
            return res.status(401).json({ // 401 Unauthenticated
                status: 'ERR',
                message: 'Incorrect email or password'
            });
        }
        const { refresh_token, ...newReponse } = response.data
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async(req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        if (!req.headers.token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }

        const tokenParts = req.headers.token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({
                status: 'ERR',
                message: 'Invalid token format'
            });
        }

        let token = tokenParts[1];
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token', { path: '/' })
            return res.status(200).json({
                status: 'OK',
                message: 'Logout successfully'
            })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}