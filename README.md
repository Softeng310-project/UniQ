# UniQ

UniQ is a centralised marketplace for University of Auckland students, designed to fill the gap left behind by the liquidation of UBIQ. It provides a simple and accessible platform for students to buy and sell course-related books and resources.

## 📖 What does this project do?
**UniQ makes it easy for UoA students to:**
- Browse course-specific textbooks and materials
- Search for books by keyword or course code
- View detailed book information (including pricing)

## 🌟 Why is this project useful?
- Helps students save money by finding affordable textbooks
- Provides a centralised place for student-to-student sales
- Encourages sustainability by re-using and reselling study materials
- Fills the gap left by UBIQ’s closure, which previously provided a similar service

## Tech Stack

**Frontend:**
- React
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend:**
- MongoDB (native driver)

## 🚀 Getting Started

**✅ Prerequisites**
- Node.js 
- npm (comes with Node)
- MongoDB connection string (Atlas or local instance)

**⚙️ Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Softeng310-project/UniQ.git
   cd UniQ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── about/               # About page
│   ├── api/                 # API routes
│   ├── book/                # Book details pages
│   ├── course-books/        # Course books listing
│   ├── legal/               # Legal / policy pages
│   ├── not-implemented/     # Placeholder page for unfinished features
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # Custom 404 page
│   └── page.tsx             # Home page
│
├── components/              # Reusable React components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries (DB + helpers)
├── models/                  # Database models
├── public/                  # Static assets

```

## Features

- 📚 Browse books by course
- 🔍 Search for specific textbooks
- 📖 Detailed book information
- 🚧 "Not Implemented" placeholder pages
- 👤 Planned: user accounts and order history

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 How can the software be used?
This project is licensed under the MIT License; a permissive open-source license.
You are free to use, modify, and distribute this software as long as the original license is included.

## 📄 License
This project is licensed under the MIT License. [MIT License](https://opensource.org/license/mit/)
