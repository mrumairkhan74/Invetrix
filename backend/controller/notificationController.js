const notificationModel = require('../model/notificationModel')



// getNotification
const getNotification = async (req, res) => {
    try {
        const notifications = await notificationModel.find({ isRead: false }).populate("item", "name")
        if (!notifications) {
            return res.status(400).json({ message: "Something went wrong " })
        }
        return res.status(201).json({ message: 'Successfully', notifications })
    }
    catch (error) {
        return res.status(500).json({ error: message.error })
    }
}

// marksAsRead Notification
const marksAsRead = async (req, res) => {
    try {
        const notifications = await notificationModel.findByIdAndUpdate(req.params.id, { isRead: true })
        if (!notifications) {
            return res.status(500).json({ message: 'Something went Wrong' })
        }
        return res.status(200).json({ message: 'Marked As Read ' })
    }
    catch (error) {
        return res.status(500).json({ error: message.error })
    }
}


module.exports = {
    marksAsRead,
    getNotification
}
