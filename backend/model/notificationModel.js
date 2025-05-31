
const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['low Stock', 'expired']
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
    }
})



const notificationModel = mongoose.model('Notification', notificationSchema)

module.exports = notificationModel