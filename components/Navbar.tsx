import Image from "next/image";
import { MdAccountCircle, MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";

export function SearchBar() {
  return (
    <div className="flex items-center rounded-full px-4 py-2 text-black w-64">
      <MdOutlineSearch size={30} className="absolute text-white mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="bg-white outline-none flex-1 translate-x-8 px-1 rounded"
      />
    </div>
  );
}

export function TopBar() {
  return (
    <div className="bg-[#6E8EBE] h-24 text-white flex items-center justify-between px-6">
      
      {/* Left - Search bar */}
      <SearchBar />

      {/* Center - Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/assets/UniQ.png"
          alt="UniQ Logo"
          width={150}
          height={150}
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* Right - Account + Cart */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>Account</span>
          <MdAccountCircle size={30} />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>Cart</span>
          <MdOutlineShoppingCart size={30} />
        </div>
      </div>
    </div>
  )
}

export function BottomBar() {
  const items = ["Home", "New Arrivals", "Course Books", "Notebooks & Pads", "Writing Supplies", "Other"];

  return (
    <div className="bg-[#FFDBC2] h-16 text-white flex items-center justify-between px-24">
      {items.map((item, index) => (
        <div key={index} className="text-[#385684] cursor-pointer text-2xl">
          {item}
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  return (
    <div>
      <TopBar/>
      <BottomBar/>
    </div>
  );
}
