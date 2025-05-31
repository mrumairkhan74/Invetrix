const inventoryLog = require('../model/inventoryModel')


// create Logs
const createLogs = async (req, res) => {
    try {
        const logs = await inventoryLog.create({ ...req.body, updateBy: req.user.id })
        if (!logs) {
            return res.status(400).json({ message: "Something went wrong " })
        }
        return res.status(201).json({ message: 'Created Successfully', logs })
    }
    catch (error) {
        return res.status(500).json({ error: message.error })
    }
}

// getLogs
const getLogs = async (req, res) => {
    try {
        const logs = await inventoryLog.find().populate('item', 'name email').sort({ timestamp: -1 })
        if (!logs) {
            return res.status(500).json({ message: 'Something went Wrong' })
        }
        return res.status(200).json({ message: 'Successfully ', logs })
    }
    catch (error) {
        return res.status(500).json({ error: message.error })
    }
}


module.exports = {
    getLogs,
    createLogs
}