import Navbar from '@/components/common/Navbar'
import PopCollections from '@/components/home/PopCollections'
import Footer from '@/components/common/Footer'

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
