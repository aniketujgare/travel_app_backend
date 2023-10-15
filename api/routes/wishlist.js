const express = require('express');
const router = express.Router();

const WishlistController = require('../controllers/wishlist');
router.get('/', WishlistController.get_all_wishlists);
router.get('/:userId', WishlistController.get_wishlist_of_user);
router.post('/add', WishlistController.add_wishlist);
router.patch('/remove', WishlistController.remove_dest_from_wishlist);

module.exports = router;