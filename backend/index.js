require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const logsRoutes = require('./routes/inventorylogRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true
}))


// all routes
app.use('/user', userRoutes)
app.use('/item', itemRoutes)
app.use('/logs', logsRoutes)
app.use('/notification', notificationRoutes)



const port = process.env.PORT
app.listen(port, () => {
    console.log('Server running on 8000')
})