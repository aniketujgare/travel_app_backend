const express = require('express');
const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist');

  exports.get_all_wishlists= async (req, res,next) => {
    try {
      // Retrieve all destinations from the database
      const wishlist = await Wishlist.find().exec();
  
      // Return the destinations as JSON response
      res.status(200).json(wishlist);
    } catch (error) {
      // Handle errors, e.g., send an error response
      res.status(500).json({ error: 'Failed to retrieve wishlists' });
    }
  };

exports.get_wishlist_of_user = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract the userId from the URL parameter

        // Validate the userId if needed

        // Find the user's wishlist by userId
        const userWishlist = await Wishlist.findOne({ userid: userId }).populate('destinations');

        if (!userWishlist) {
            return res.status(404).json({ error: 'User wishlist not found' });
        }

        res.json(userWishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  exports.add_wishlist = async (req, res) => {
    const { userId, destinationId } = req.body;
  
    try {
      // Check if the user has an existing wishlist
      let wishlist = await Wishlist.findOne({ userid: userId });
  
      if (!wishlist) {
        // If no wishlist exists, create a new one
        wishlist = new Wishlist({  _id: new mongoose.Types.ObjectId(),userid: userId, destinations: [] });
      }
  
      // Add the destination to the wishlist
      wishlist.destinations.push(destinationId);
      await wishlist.save();
  
      res.status(200).json({ message: 'Destination added to the wishlist', wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the destination to the wishlist' });
    }
  };

  exports.remove_dest_from_wishlist =async (req, res) => {
    try {
        const { userId, destinationId } = req.body;

        // Validate that userId and destinationId are provided and are valid ObjectIds

        // Find the user's wishlist by userId
        const userWishlist = await Wishlist.findOne({ userid: userId });

        if (!userWishlist) {
            return res.status(404).json({ error: 'User wishlist not found' });
        }

        // Remove the destinationId from the wishlist
        const updatedWishlist = userWishlist.destinations.filter(dest => dest != destinationId);

        // Update the user's wishlist
        userWishlist.destinations = updatedWishlist;
        const savedWishlist = await userWishlist.save();

        res.json({ message: 'Destination removed from wishlist', wishlist: savedWishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};