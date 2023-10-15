const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    images: { type:[String]  },
    name: String,
    shortDescription: String,
    
});

module.exports = mongoose.model('Destination', destinationSchema);