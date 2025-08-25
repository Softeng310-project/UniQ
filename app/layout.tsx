import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })

// Application metadata for SEO and browser display
export const metadata: Metadata = {
  title: 'UniQ - University Marketplace',
  description: 'A centralised marketplace for UoA students',
}

// Root layout component that wraps all pages
// Provides consistent header (navbar) and footer across the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}