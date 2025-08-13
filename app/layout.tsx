import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import PopCollections from '@/components/PopCollections'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniQ - University Marketplace',
  description: 'A centralised marketplace for UoA students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {children}
          {/* Margin is to show space for New Arrivals section, can delete. */}
          <div className="mt-64">
          <PopCollections />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
