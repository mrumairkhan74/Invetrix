require('dotenv').config()
const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.error(err)
    });


module.exports = { db }