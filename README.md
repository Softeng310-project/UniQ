# UniQ

UniQ is a website that focuses on bringing a centralised marketplace to UoA students, filling the gap left behind by the liquidation of UBIQ.

## Tech Stack

**Frontend:**
- React
- Next.js 14
- TypeScript
- Tailwind CSS

**Backend:**
- Next.js API Routes
- MongoDB
- Mongoose

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── book/              # Book details pages
│   ├── course-books/      # Course books listing
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── lib/                   # Utility libraries
│   └── mongodb.ts         # Database connection
├── models/                # MongoDB models
│   └── Book.ts           # Book model
└── public/               # Static assets
```

## Features

- 📚 Browse books by course
- 🔍 Search for specific textbooks
- 📖 Detailed book information
- 💰 Price comparison
- 👤 Seller contact information

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
