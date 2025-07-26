// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    // Now an array of image URLs
    images: [
      {
        type: String,
        required: true,
      },
    ],

    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Rented"],
      default: "Available",
    },

    // Contact Info
    contactName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
