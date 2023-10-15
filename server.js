const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
require('dotenv').config()
//!S7WgxW42YeBEnNgq
const { Client, Storage } = require('appwrite');
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652a39c91ea6dd973326');

const storage = new Storage(client);
// const promise = storage.createFile(
//     '652a3a042b9e7a422e69',
//     ID.unique(),
//     document.getElementById('uploader').files[0]
// );

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
const result = storage.getFileView('652a3a042b9e7a422e69', '652a3b9b1adf95b7b1f1');
console.log(result); // Resource URL
mongoose.connect('mongodb+srv://aniketujgare:S7WgxW42YeBEnNgq@cluster0.ikt5cag.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log('database connected');
});

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const userRoutes = require('./api/routes/user');
const destinationRoutes = require('./api/routes/destination');
const wishlistRoutes = require('./api/routes/wishlist');

//* Routes which should handle requests
app.use('/user', userRoutes);
app.use('/destination', destinationRoutes)
app.use('/wishlist', wishlistRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(3000, () => {
    console.log('server started on port 3000');
});