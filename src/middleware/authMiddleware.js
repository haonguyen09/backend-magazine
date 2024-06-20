const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    console.log('token', token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err) {
            return res.status(404).json({
                message: "The authentication failed",
                status: 'ERROR'
            })
        }
        if (user.role == "admin") {
            next()
        } else if (user.role == "student") {
            if (req.path.includes('/article/create')) {
                next();
            } else {
                return res.status(403).json({
                    message: "Access denied: Student can only access create article functions",
                    status: 'ERROR'
                });
            }
        } else {
            return res.status(404).json({
                message: "Access denied",
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare
}