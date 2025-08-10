import { FaRegEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full mt-12">
      {/* Newsletter Bar */}
  <div className="bg-[#6E8EBE] py-6 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left font-semibold text-lg mb-4 md:mb-0">
          <span className="text-[#FFDBC2]">Sign Up to our Newsletter</span>
          <span className="text-white"> for all the latest deals straight in your inbox!</span>
        </div>
        <form className="flex items-center w-full md:w-auto justify-center md:justify-end">
          <input
            type="email"
            placeholder="Your email address"
            className="bg-white text-[#333] px-4 py-2 rounded-l-md focus:outline-none w-48 md:w-64"
          />
          <button
            type="submit"
            className="bg-[#FFDBC2] px-4 py-2 rounded-r-md flex items-center gap-2 text-[#385684] font-semibold hover:bg-[#e6c2a2] transition-colors"
          >
            <FaRegEnvelope className="text-[#333]" /> Send
          </button>
        </form>
      </div>
      {/* Footer Links */}
  <div className="bg-[#FFDBC2] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* About Us */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">About us</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">About us</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Delivery & returns</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Privacy policy</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          {/* Customer Service */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">Customer service</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Contact</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Site Map</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Brands</a></li>
            </ul>
          </div>
          {/* My Account */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">My account</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">My account</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Order History</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}