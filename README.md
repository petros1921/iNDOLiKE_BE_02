# URL Shortener ✂️

A full-stack Node.js project that allows users to shorten URLs using a custom alias generator. Built with Express and MongoDB using Mongoose.

---

## 🚀 Features

- Create short URLs from long URLs
- Track and manage shortened links
- Use a unique ID generator (`nanoid`)
- MongoDB Atlas for database storage
- RESTful API with Express
- Simple frontend interface

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, Mongoose, nanoid
- **Database**: MongoDB Atlas
- **Frontend**: HTML, CSS, JavaScript (Basic)

---

## 🧪 Getting Started

### Clone the repo:

```bash
git clone https://github.com/petros1921/iNDOLiKE_BE_02.git
cd iNDOLiKE_BE_02
```

### Install dependencies:

```bash
npm install
```

### Setup Environment Variables:

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

> Replace `your_mongodb_connection_string` with your actual MongoDB URI from MongoDB Atlas.

### Start the server:

```bash
npm start
```

---

## 📁 Folder Structure

```
.
├── models
│   └── shortUrl.js
├── public
│   ├── styles
│   │   └── main.css
│   └── index.html
├── server.js
├── .env
├── .gitignore
└── package.json
```

---

## 👤 Author

**Petros1921**

- GitHub: [@petros1921](https://github.com/petros1921)



