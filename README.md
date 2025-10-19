# UniQ

UniQ is a centralised marketplace for University of Auckland students, designed to fill the gap left behind by the liquidation of UBIQ. It provides a simple and accessible platform for students to buy and sell course-related books and resources.

## What does this project do?

**UniQ makes it easy for UoA students to:**

- Browse course-specific textbooks and materials
- Search for books by keyword or course code
- View detailed book information (including pricing)

## Why is this project useful?

- Helps students save money by finding affordable textbooks
- Provides a centralised place for student-to-student sales
- Encourages sustainability by re-using and reselling study materials
- Fills the gap left by UBIQ’s closure, which previously provided a similar service

## Tech Stack

**Frontend:**

- React 18
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend:**

- MongoDB (native driver)
- Mongoose
- Next.js API routes
- JSON Web Tokens (jose)

## Getting Started

### Prerequisites

- Node.js 18+
- npm (bundled with Node)
- MongoDB connection string (Atlas or local instance)

### Installation

1. **Fork the repository** so you have your own copy.
2. **Clone your fork** (replace `<your-username>` with your GitHub username):
   ```bash
   git clone https://github.com/<your-username>/UniQ.git
   cd UniQ
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a local environment file:**
   ```bash
   cp .env.example .env
   ```

### Environment variables

Update `.env` with the values for your setup:

- `MONGODB_URI` – connection string for the MongoDB instance the app should use.
- `AUTH_JWT_SECRET` – a long random string used to sign authentication cookies. You can generate one with `openssl rand -base64 32`.

### Run the app

Start the development server and open [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── about/               # About page
│   ├── account/             # Authenticated account dashboard
│   ├── api/                 # API routes (auth, cart, orders, products)
│   ├── book/                # Book details pages
│   ├── cart/                # Protected cart view
│   ├── course-books/        # Course books listing
│   ├── legal/               # Legal / policy pages
│   ├── new-arrivals/        # Latest additions
│   ├── notebooks-and-pads/  # Product category landing
│   ├── not-implemented/     # Placeholder page for unfinished features
│   ├── order-confirmed/     # Checkout confirmation page
│   ├── other/               # Misc product category landing
│   ├── product-results/     # Search result grid
│   ├── search/              # Rich search with filters
│   ├── sign-in/             # Sign-in and sign-up
│   ├── writing-supplies/    # Product category landing
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # Custom 404 page
│   └── page.tsx             # Home page
│
├── components/              # Reusable React components
├── contexts/                # Global providers (cart, etc.)
├── hooks/                   # Custom React hooks
├── lib/                     # Server helpers (database, auth, API utils)
├── models/                  # Mongoose models
├── scripts/                 # Utility scripts (database seeding)
├── tests/                   # Jest unit/integration tests
├── public/                  # Static assets
└── __mocks__/               # Jest mocks
```

## Features

- Browse catalogues for course books, notebooks, writing supplies, and more
- Filter and search by course code
- View detailed product information with pricing and descriptions
- Create an account, sign in, and manage an authenticated cart
- Persist cart contents and confirm orders (with history shown in the account dashboard)
- Seed the database with realistic sample products for demos and testing

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – compile the production build
- `npm run test` – execute the Jest test suite

## Testing

Jest and React Testing Library cover both unit and integration scenarios. Tests live in the `tests` directory and can be run with:

```bash
npm run test
```

## How can the software be used?

This project is licensed under the MIT License; a permissive open-source license.
You are free to use, modify, and distribute this software as long as the original license is included.

## License

This project is licensed under the MIT License. [MIT License](https://opensource.org/license/mit/)
