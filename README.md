 

---

```markdown
# 🏡 Airbnb-Style Booking App

An Airbnb-inspired booking platform built with **Node.js, Express, MongoDB, EJS**, and **Stripe** for payments.  
Users can browse listings, book stays, make payments, and download PDF receipts for their bookings.

---

## 🚀 Features

- User Authentication (Login/Register)
- Browse and Search Listings
- Book Listings with Date & Guest Details
- Stripe Payment Integration
- Booking Management (My Bookings Page)
- Generate PDF Receipts for Orders
- Responsive Airbnb-style UI (EJS + CSS)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, CSS
- **Database:** MongoDB with ATLAS
- **Payments:** Stripe Checkout
- **PDF Generation:** pdfkit

---

## 📂 Project Structure

```

📦 wanderlust
├── 📁 models
│   ├── Listing.js
│   └── Order.js
├── 📁 routes
│   ├── listings.js
│   ├── orders.js
│   └── users.js
├── 📁 views
│   ├── listings
│   │   ├── index.ejs
│   │   └── show\.ejs
│   ├── orders
│   │   ├── bookings.ejs
│   │   └── receipt.ejs
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── auth
│       ├── login.ejs
│       └── register.ejs
├── app.js
├── package.json
├── .env
└── README.md

````

---

## ⚙️ Installation

1. **Clone Repo**
   ```bash
   git clone https://github.com/yourusername/airbnb-booking-app.git
   cd airbnb-booking-app
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables** (`.env`)

   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection
   STRIPE_SECRET=your_stripe_secret_key
   STRIPE_PUBLIC=your_stripe_publishable_key
   ```

4. **Run App**

   ```bash
   npm start
   ```

   App will run on: `http://localhost:8080`

---

## 🛒 Booking Flow

1. User selects a listing
2. Chooses **from/to dates**, number of guests
3. Confirms booking → Stripe Checkout opens
4. On successful payment → Booking saved in DB
5. User can view bookings in **My Bookings**
6. User can **Download PDF Receipt**

---

## 📑 API Routes

### Listings

* `GET /listings` → All listings
* `GET /listings/:id` → Single listing details

### Orders

* `POST /orders/create` → Create a booking
* `GET /orders/my` → Show logged-in user's bookings
* `GET /orders/:id/receipt` → Download PDF receipt

### Users

* `GET /login` / `POST /login`
* `GET /register` / `POST /register`
* `GET /logout`

---

## 📃 PDF Receipt Example

Each booking receipt includes:

* Booking ID
* Listing Title
* User Info
* Dates & Guests
* Total Fare
* Payment Status

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`feature-new`)
3. Commit changes
4. Open PR

---

## 📜 License

MIT License © 2025

```

---

 
```
