const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({...payload}, process.env.ACCESS_TOKEN, { expiresIn: '30m' })
    
    return access_token 
}

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({...payload}, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    
    return refresh_token
}

const customAccessTokenProcessing = async (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign({...payload}, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
                resolve({
                    status: 'ERR',
                    message: 'Invalid or expired token'
                });
            } else {
                try {
                    const access_token = await generalAccessToken({
                        id: user.id,
                        role: user.role
                    });
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        access_token
                    });
                } catch (e) {
                    console.error('Access Token Generation Error:', e.message);
                    reject({
                        status: 'ERR',
                        message: 'Failed to generate access token'
                    });
                }
            }
        });
    });
};



module.exports = {
    generalAccessToken,
    generalRefreshToken,
    customAccessTokenProcessing,
    refreshTokenJwtService
}