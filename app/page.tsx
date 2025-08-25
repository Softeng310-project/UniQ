import PopCollections from '@/components/home/PopCollections'
import NewArrivals from '@/components/home/NewArrivals'

// Home page component displaying featured content
// Shows new arrivals and popular collections to engage users
export default function Home() {
  return (
    <div className="home">
      <NewArrivals />
      <PopCollections />
    </div>
  )
}
