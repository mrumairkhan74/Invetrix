const mongoose = require('mongoose');


const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
})


const supplierModel = mongoose.model('Supplier', supplierSchema)

module.exports = supplierModel