const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return res.status(401).json({ error: 'User Existed' })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
        res.cookie('token', token)

        return res.status(200).json({ message: 'User Created', user: { email: user.email, role: user.role } })

    }
    catch (err) {
        return res.status(500).json({ err: message.err })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkedUser = await UserModel.findOne({ email })
        if (!checkedUser) {
            return res.status(404).json({ message: 'USer not Founded' })
        }

        const isMatched = await bcrypt.compare(password, checkedUser.password)
        if (!isMatched) {
            return res.status(409).json({ message: 'Invalid Password' })
        }
        const token = jwt.sign({ email: checkedUser.email, role: checkedUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
        res.cookie('toke', token)
        return res.status(200).json({ message: 'Login Successfully', user: { email: checkedUser.email, role: checkedUser.role, name: checkedUser.name } })

    }
    catch (err) {
        return res.status(500).json({ err: message.err })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token'); // Correct method: clearCookie (not clearCookies)
        return res.json('Logout Successfully');
    } catch (err) {
        return res.status(500).json({ error: 'Logout failed', details: err.message });
    }
};



module.exports = {
    loginUser,
    createUser,
    logoutUser
}