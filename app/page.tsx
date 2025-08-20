import Navbar from '@/components/common/Navbar'
import PopCollections from '@/components/home/PopCollections'
import Footer from '@/components/common/Footer'
import NewArrivals from '@/components/home/NewArrivals'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <NewArrivals />
      <PopCollections />
      <Footer />
    </div>
  )
}
