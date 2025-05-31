const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel')


const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
        const user = await UserModel.find({ _id: decoded.id, email: decoded.email, role: decoded.role })
        req.user = user
        next()
    }
    catch (err) {
        return res.status(500).json({ err: message.error })
    }
}
module.exports = {
    Authentication
}