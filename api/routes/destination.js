const express = require('express');
const router = express.Router();

const DestinationController = require('../controllers/destination');
router.post('/add', DestinationController.add_destination);
router.get('/', DestinationController.get_all_destination);

module.exports = router;