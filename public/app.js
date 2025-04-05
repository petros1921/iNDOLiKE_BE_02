document.addEventListener("DOMContentLoaded", () => {
  const urlForm = document.getElementById("url-form")
  const longUrlInput = document.getElementById("long-url")
  const shortenBtn = document.getElementById("shorten-btn")
  const loader = document.getElementById("loader")
  const result = document.getElementById("result")
  const shortUrlElement = document.getElementById("short-url")
  const copyBtn = document.getElementById("copy-btn")
  const copyMessage = document.getElementById("copy-message")
  const errorMessage = document.getElementById("error-message")

  // Form submission
  urlForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const longUrl = longUrlInput.value.trim()

    if (!longUrl) {
      showError("Please enter a URL")
      return
    }

    // Show loader, hide results and errors
    loader.classList.remove("hidden")
    result.classList.add("hidden")
    errorMessage.classList.add("hidden")
    shortenBtn.disabled = true

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      // Display the shortened URL
      shortUrlElement.href = data.shortUrl
      shortUrlElement.textContent = data.shortUrl
      result.classList.remove("hidden")
    } catch (error) {
      showError(error.message)
    } finally {
      loader.classList.add("hidden")
      shortenBtn.disabled = false
    }
  })

  // Copy to clipboard functionality
  copyBtn.addEventListener("click", () => {
    const shortUrl = shortUrlElement.textContent

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        copyMessage.classList.remove("hidden")

        // Hide the message after 2 seconds
        setTimeout(() => {
          copyMessage.classList.add("hidden")
        }, 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        showError("Failed to copy to clipboard")
      })
  })

  // Helper function to show error messages
  function showError(message) {
    errorMessage.textContent = message
    errorMessage.classList.remove("hidden")
  }
})

