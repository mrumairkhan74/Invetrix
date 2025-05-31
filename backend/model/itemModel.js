const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: 'pcs'
    },
    reorderLevel: {
        type: Number,
        default: 5
    },
    expiry: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
    },
    image: {
        type: Buffer,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const itemsModel = mongoose.model('Item', itemSchema);

module.exports = itemsModel