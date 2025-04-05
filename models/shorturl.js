const mongoose = require("mongoose")
const { nanoid } = require("nanoid")

const analyticsSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    userAgent: {
      type: Object,
    },
    referrer: {
      type: String,
    },
    ip: {
      type: String,
    },
    location: {
      country: String,
      region: String,
      city: String,
    },
  },
  { _id: false },
)

const shortUrlSchema = new mongoose.Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(6),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  analytics: [analyticsSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customSlug: {
    type: String,
    default: null,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
})

module.exports = mongoose.model("ShortUrl", shortUrlSchema)
