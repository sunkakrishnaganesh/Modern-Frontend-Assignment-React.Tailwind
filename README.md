📦 Listings App (React + TypeScript + Vite + Tailwind)

A clean product listing application built with React, TypeScript, Tailwind CSS, and Vite.
Includes product listings, product details, rating UI, add-to-cart functionality, modals, loading skeletons, mock APIs, and review submission.

This project is part of an assignment and demonstrates clean architecture, component reusability, state management, mock API handling, and UI consistency.

🚀 Tech Stack

React 18

TypeScript

Vite

Tailwind CSS

Context API (Cart state)

Mock Service Worker (MSW) – for fake API backend

React Router DOM

Modular folder structure

🛠️ Installation & Setup
1. Clone the repo
git clone https://github.com/<your-name>/<your-repo>.git
cd <your-repo>

2. Install dependencies
npm install


or

yarn

3. Start the development server
npm run dev


Your app runs on:

http://localhost:5173/

📁 Folder Structure
src/
 ├── components/
 │    ├── Navbar.tsx
 │    ├── productcard.tsx
 │    ├── RatingStars.tsx
 │    ├── ReviewModal.tsx
 │    ├── Modal.tsx
 │    ├── SkeletonCard.tsx
 │    └── Toast.tsx
 │
 ├── context/
 │    └── CartContext.tsx
 │
 ├── features/
 │    └── products/
 │          ├── ProductList.tsx
 │          ├── ProductDetails.tsx
 │          └── useProducts.ts
 │
 ├── hooks/
 │    └── useReviews.ts
 │
 ├── mocks/
 │    ├── browser.ts
 │    ├── handlers.ts
 │    └── server.ts
 │
 ├── data/
 │    └── products.json
 │
 ├── App.tsx
 ├── main.tsx
 ├── index.css
 └── vite-env.d.ts

🧪 Mock API Setup (MSW)

This project uses Mock Service Worker to simulate product APIs.

Available API routes
Method	Route	Description
GET	/api/products	Fetch all products
GET	/api/products/:id	Fetch single product
GET	/api/reviews/:id	Get reviews for product
POST	/api/reviews/:id	Add a new review

💡 MSW automatically starts in development mode.

✨ Features
✅ Product Listing

Search

Sort

Filter

Pagination

Loading Skeletons

✅ Product Details

Full product info

Ratings

Reviews modal

Add review

Similar products

✅ Cart Feature

Add to cart

Remove from cart

Cart badge updates in Navbar

Global state stored in Context API

✅ UI

Fully responsive

Clean Tailwind styling

Modal animations

Toast notifications

🌐 Deployment (Vercel or Netlify)
Deploy to Vercel

Go to: https://vercel.com/new

Import GitHub repository

Set Build Command:

npm run build


Set Output Directory:

dist


Click Deploy

Deploy to Netlify
npm run build


Then drag the dist/ folder into:

https://app.netlify.com/drop

📸 Screenshots

(Add your screenshots here if required)

/public/screenshots/home.png
/public/screenshots/details.png
/public/screenshots/cart.png

🤝 Contributing (Optional)

This is an assignment project, but feel free to improve components, styling, or add features.

📜 License

MIT License.

🏁 Final Notes

This project demonstrates:

✔ Modular architecture
✔ Component isolation
✔ Reusable hooks
✔ Clean UI logic
✔ Mock API integration
✔ Scalable folder structure
✔ Industry-standard patterns