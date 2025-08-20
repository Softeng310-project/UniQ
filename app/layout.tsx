import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/Navbar'
import PopCollections from '@/components/home/PopCollections'
import Footer from '@/components/common/Footer'
import CourseBooks from './course-books/page'

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
        <main>{children}</main>
      </body>
    </html>
  )
}
