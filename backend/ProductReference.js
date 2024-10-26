// models/ProductReference.js
const mongoose = require('mongoose');

// Define the schema for the product and reference data
const productReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  gstNo: {
    type: String,
  },
  products: [
    {
      productName: {
        type: String,
      },
      category: {
        type: String,
      },
      qty: {
        type: Number,
      },
      unit: {
        type: String,
      },
      pay: {
        type: Number,
      },
      description: {
        type: String,
        
      },
    },
  ],
  reference: {
    ourReference: {
      type: String,
    },
    leadGeneratedBy: {
      type: String,
    },
    specialRemark: {
      type: String,
    },
    suggestions: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date when the document is created
  },
});

// Create the model
const ProductReference = mongoose.model('ProductReference', productReferenceSchema);

module.exports = ProductReference;
