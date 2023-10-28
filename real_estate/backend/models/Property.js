const mongoose = require('mongoose');
const {Schema}= mongoose;

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available',
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  dateOfListing: {
    type: Date,
    default: Date.now,
  },
  dateOfSale: {
    type: Date,
  },
});

const Property = mongoose.model('property', propertySchema);

module.exports = Property;