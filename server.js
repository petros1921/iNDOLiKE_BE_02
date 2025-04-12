const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const ShortUrl = require("./models/shorturl")

const app = express()
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Create short URL
app.post("/api/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body

    // Validate URL
    if (!isValidUrl(longUrl)) {
      return res.status(400).json({ error: "Invalid URL" })
    }

    // Check if URL already exists in database
    let url = await ShortUrl.findOne({ long: longUrl })

    if (url) {
      return res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${url.short}` })
    }

    // Create new short URL
    url = new ShortUrl({ long: longUrl })
    await url.save()

    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${url.short}` })
  } catch (error) {
    console.error("Error creating short URL:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Redirect to original URL
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    const url = await ShortUrl.findOne({ short: shortUrl })

    if (!url) {
      return res.status(404).sendFile(path.join(__dirname, "public", "404.html"))
    }

    // Increment click count
    url.clicks++
    await url.save()

    res.redirect(url.long)
  } catch (error) {
    console.error("Error redirecting:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get URL stats
app.get("/api/stats/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    const url = await ShortUrl.findOne({ short: shortUrl })

    if (!url) {
      return res.status(404).json({ error: "URL not found" })
    }

    res.json({
      longUrl: url.long,
      shortUrl: `${req.protocol}://${req.get("host")}/${url.short}`,
      clicks: url.clicks,
      createdAt: url.createdAt,
    })
  } catch (error) {
    console.error("Error getting stats:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Helper function to validate URL
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

