const express = require('express');
const mongoose = require('mongoose');
const Destination = require('../models/destination');

exports.add_destination = async (req, res,next) => {
    try {
      // Create a new destination instance based on the request body
      const newDestination = new Destination({
        _id: new mongoose.Types.ObjectId(),
        images: req.body.images,
        name: req.body.name,
        shortDescription: req.body.shortDescription
      });
  
      // Save the destination to the database
      const savedDestination = await newDestination.save();
  
      res.status(201).json(savedDestination);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.get_all_destination = async (req, res,next) => {
    try {
      // Retrieve all destinations from the database
      const destinations = await Destination.find().exec();
  
      // Return the destinations as JSON response
      res.status(200).json(destinations);
    } catch (error) {
      // Handle errors, e.g., send an error response
      res.status(500).json({ error: 'Failed to retrieve destinations' });
    }
  };