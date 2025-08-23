import PopCollections from '@/components/home/PopCollections'
import NewArrivals from '@/components/home/NewArrivals'

export default function Home() {
  return (
    <div className="home">
      <NewArrivals />
      <PopCollections />
    </div>
  )
}
