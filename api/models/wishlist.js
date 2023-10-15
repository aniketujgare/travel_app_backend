const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid:{type: mongoose.Schema.Types.ObjectId, ref:'User' },
    destinations:{type: [mongoose.Schema.Types.ObjectId], ref:'Destination' }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);