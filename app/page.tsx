import Navbar from '@/components/Navbar'
import PopCollections from '@/components/PopCollections'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="mt-64">
        <h1>New Arrivals</h1>
      </div>
      <PopCollections />
      <Footer />
    </div>
  )
}
