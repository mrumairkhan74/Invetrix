const mongoose = require('mongoose');


const inventoryLogSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    type: {
        type: String,
        enum: ['added', 'used', 'spoiled', 'delivered']
    },
    quantity: {
        type: Number
    },
    note: {
        type: String
    },
    updatedAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
})


const inventoryLogModel = mongoose.model('InventoryLog', inventoryLogSchema)

module.exports = inventoryLogModel