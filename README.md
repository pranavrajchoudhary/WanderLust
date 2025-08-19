

-----

# 🏡 WanderLust – Airbnb-style Full-Stack Web App

A production-ready Airbnb-style web app where users can explore, book, and manage stays. Built on Node/Express + MongoDB + EJS with clean UI, secure auth, Stripe payments, and an opinionated architecture that scales.

**Live demo:** (add your domain here)

-----

## ✨ Features

  - **🔍 Smart Search + Filters**
      - Search by location/keywords; filter trips by status (Paid/Pending/Cancelled) and time (Upcoming/Past).
  - **🗺️ Interactive Maps**
      - Geo-coordinates on listings with map pins (Point geometry stored; render on client).
  - **🏡 Listings CRUD**
      - Create, edit, delete your own properties; images stored on Cloudinary.
  - **🔐 Auth + Access Control**
      - Passport.js local strategy, Mongo-backed sessions (connect-mongo), role-based guards.
  - **💬 Reviews & Ratings**
      - Auth’d users can add/delete their reviews; owners can moderate.
  - **💸 Dynamic Fare & Tax**
      - Checkout computes nights from date range, auto-applies service fee/taxes on the fly (client + server validation).
  - **🧾 Stripe Payments (Sandbox)**
      - Seamless checkout via Stripe Checkout; orders stored with pending → paid state changes.
  - **📂 My Bookings (Trips) Page**
      - Beautiful Airbnb-like list with filters, nights calculation, responsive cards, and actions (view place, cancel, get receipt).
  - **⚠️ Robust Error Handling & Flash Messages**
      - Helpful feedback states using Express middleware and EJS partials.
  - **🧠 Session Store in Mongo (Prod)**
      - Resilient session storage via `connect-mongo` (not memory).

-----

## 🛠️ Tech Stack

| Frontend                    | Backend             | Database       | Infra / Integrations                                         |
| --------------------------- | ------------------- | -------------- | ------------------------------------------------------------ |
| HTML, CSS, EJS, Tailwind (CDN) | Node.js, Express.js | MongoDB Atlas  | Passport.js, Mongoose, Cloudinary, `connect-mongo`, Stripe |

-----

## 📂 Project Structure

```
/wanderlust
│
├── models/             # Mongoose models (Listing, User, Order, Review, etc.)
├── routes/             # Express routes (listings, auth, checkout/payments, orders)
├── controllers/        # Controller logic (separated per feature)
├── views/              # EJS templates (pages + partials)
├── public/             # Static assets (CSS, JS, images)
├── middleware/         # Auth guards, error handlers, validators
├── utils/              # Helpers (e.g., price calc, date utils)
├── init/               # (Dev) seed data / init scripts
└── app.js              # Main server entrypoint
```

-----

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Mongo
ATLAS_URL="your_mongodb_atlas_connection_string"

# Sessions
SESSION_SECRET="a_strong_random_secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Stripe (Sandbox)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App URLS
BASE_URL="http://localhost:8080"        # local base URL
PROD_BASE_URL="https://yourdomain.com"  # set in production
```

**Why `BASE_URL`/`PROD_BASE_URL`?**

Stripe success/cancel URLs must be absolute. In dev we use `BASE_URL`; in prod we point to your domain. This prevents route mismatch issues when returning from the Stripe checkout page.

-----

## 📦 Install & Run Locally

```bash
# 1) Clone the repository
git clone https://github.com/pranavrajchoudhary/wanderlust.git
cd wanderlust

# 2) Install dependencies
npm install

# 3) Setup the .env file (see variables above)

# 4) (Optional) Seed development data (run this only locally!)
# node init/index.js    # or your specific seeding script inside /init

# 5) Start the server
npm run dev             # Uses nodemon for auto-restarts
# or
npm start               # Uses node directly

# App will be running at:
# http://localhost:8080
```

**Note:** Do not run seeding scripts in a production environment. Keep the `/init` directory ignored during deployments.

-----

## 🧾 Payments Flow (Stripe Checkout)

**Route:** `POST /listings/:id/checkout`

1.  The client-side form sends the booking details (`fromDate`, `toDate`, `guests`, `guestNames[]`, `guestAges[]`, `email`, `phone`, `requests`, `totalFare`).
2.  The server validates the listing and dates.
3.  It **re-computes** the total fare (nights, base fare, fees) on the server to prevent client-side tampering.
4.  An `Order` document is created in the database with a `status` of `"pending"`.
5.  A Stripe Checkout Session is created, and the user is redirected to the Stripe payment page.
6.  **Success URL:**
      - Dev: `${BASE_URL}/payment-success?oid=<orderId>`
      - Prod: `${PROD_BASE_URL}/payment-success?oid=<orderId>`
7.  Upon successful payment, the `payment-success` controller marks the corresponding order as `"paid"` and renders a confirmation page.

#### Order Model (excerpt)

```javascript
{
  listing: ObjectId,        // ref: 'Listing'
  user: ObjectId,           // ref: 'User'
  fromDate: Date,
  toDate: Date,
  guests: Number,
  guestNames: [String],
  guestAges: [Number],
  email: String,
  phone: String,
  requests: String,
  totalFare: Number,
  status: { type: String, default: "pending" } // "pending" | "paid" | "cancelled"
}
```

-----

## 🧭 Key Routes

| Category | Route | Description |
|---|---|---|
| **Listings** | `GET /listings` | Browse and search all listings. |
| | `GET /listings/:id` | View listing details. |
| | `GET /listings/:id/edit` | (Owner) Render edit form. |
| | `POST /listings` | (Owner) Create new listing. |
| | `PUT /listings/:id` | (Owner) Update a listing. |
| | `DELETE /listings/:id`| (Owner) Delete a listing. |
| **Checkout** | `POST /listings/:id/checkout` | Create Stripe session and redirect. |
| | `GET /payment-success` | Finalize order (mark as paid). |
| **Orders** | `GET /orders` | View "My Bookings/Trips" page. |
| | `POST /orders/:id/cancel`| Cancel a pending order. |
| **Auth** | `GET /login`, `POST /login`| |
| | `GET /register`, `POST /register`| |
| | `POST /logout` | |

-----

## 📱 Responsive UI

  - Built with EJS and **Tailwind CSS** (via CDN) for rapid, modern styling.
  - Airbnb-like cards on the "My Bookings" page.
  - Mobile-first layout: image → details → actions.
  - Filter chips wrap neatly on smaller screens.

-----

## 🧰 Dev Notes

  - **Sessions in Production**: Uses `connect-mongo` (MongoStore) instead of the default `MemoryStore`. This ensures sessions persist across server restarts and allows for horizontal scaling.
  - **Security**:
      - Never trust the `totalFare` from the client; always recompute it on the server.
      - Validate dates (e.g., checkout date must be after check-in date).
      - Use HTTPS in production (a requirement for Stripe).
      - Set `secure: true` for cookies when running behind a proxy with HTTPS.
  - **PDF Receipts (Optional Idea)**:
      - You could add a route like `GET /orders/:id/receipt` that renders a receipt template (EJS) and converts it to a PDF using a library like `puppeteer` or `pdfkit`.

-----

## 🧪 Testing (Suggested)

  - **Unit/Integration**: Jest + Supertest
  - **Load Testing**: k6 or Loader.io
  - **End-to-End (E2E)**: Playwright or Cypress

-----

## 🚀 Deployment

1.  **MongoDB Atlas**: Whitelist your server's IP address (or `0.0.0.0/0` if necessary, but be cautious).
2.  **Render / EC2 / Any VM**:
      - Set all environment variables in your hosting provider's dashboard.
      - Set `PROD_BASE_URL` to your public domain name.
      - Configure a reverse proxy (like Nginx or Caddy) to handle HTTPS.
      - The app is ready to scale horizontally thanks to the MongoDB session store.

-----

## 👤 Author

**Pranav Choudhary**

  - **GitHub:** [@pranavrajchoudhary](https://github.com/pranavrajchoudhary)

#### Stripe Setup Credit

I have taken help for the Stripe payment setup from **ChatGPT** – it’s always great to use AI for productivity enhancements\!

-----

## ⭐ Support

If you like this project or learned something, consider giving it a ⭐️ on GitHub\!
