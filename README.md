
# 🏡 WanderLust – Airbnb-style Full-Stack Web App

 

---

### 📌 Overview

**WanderLust** is a full-stack web application inspired by Airbnb. It allows users to explore, list, and review vacation rental properties across locations. Built with the **MERN stack**, the app focuses on clean UI, secure user authentication, full CRUD operations, and a scalable backend architecture.

---

### 🚀 Features

- 🔍 **Dynamic Listings**: View property cards with image, price, location & description.
- 🧾 **Authentication & Authorization**: Secure login, register, and role-based access using Passport.js.
- 🏡 **CRUD for Listings**: Users can create, edit, delete their own properties.
- 💬 **Reviews System**: Authenticated users can leave reviews with ratings.
- 📌 **Search & Filters**: Search properties by location or keyword.
- 🖼️ **Image Uploads**: Cloudinary integration for uploading listing photos.
- ⚙️ **Error Handling & Flash Messages**: Clean feedback using Express-flash and middleware.
- 🔒 **Access Control**: Logged-in users can only edit/delete their own listings/reviews.

---

### 🛠️ Tech Stack

| Frontend      | Backend       | Database | Others                 |
|---------------|----------------|----------|------------------------|
| HTML, CSS, EJS | Node.js, Express.js | MongoDB  | Passport.js, Mongoose, Cloudinary, Method-Override, Bootstrap |

---

### 📂 Folder Structure

```
/wanderlust
│
├── models/           # Mongoose models
├── routes/           # Express routes
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS, Images)
├── middleware/       # Auth & access control
├── utils/            # Custom helpers
└── app.js            # Main entry point
└── init            # For initial data

```

---

### 💻 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/pranavrajchoudhary/wanderlust.git
cd wanderlust

# 2. Install dependencies
npm install

# 3. Setup environment variables
Create a `.env` file in root and add:
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
SESSION_SECRET=your_session_secret

# 4. Run the server
npm start

# Visit http://localhost:3000
```

---

 

---

### 🙌 Author

**Pranav Choudhary**  
[@pranavrajchoudhary](https://github.com/pranavrajchoudhary)  

---

### ⭐️ Give it a Star
If you like this project or learned something, consider giving it a ⭐️ on GitHub!
