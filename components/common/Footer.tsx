import { MdInfoOutline, MdGavel, MdEmail, MdPhone, MdAccountCircle, MdOutlineShoppingCart } from "react-icons/md";

const linkClass = "flex items-center gap-1 text-[#385684] hover:text-[#27406a] transition-colors";
const sectionClass = "flex-1 text-center md:text-left";
const titleClass = "font-bold text-lg text-[#333] mb-2";

export default function Footer() {
  return (
    <footer className="w-full mt-12">
      {/* Newsletter Bar */}
      <div className="bg-[#6E8EBE] py-6 px-4 flex flex-col md:flex-row items-center justify-between"></div>
      
      {/* Footer Links */}
      <div className="bg-[#FFDBC2] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* About Us */}
          <div className={sectionClass}>
            <div className={titleClass}>About Us</div>
            <ul className="space-y-1">
              <li><a href="/about" className={linkClass}><MdInfoOutline size={18} />About us</a></li>
              <li><a href="/legal" className={linkClass}><MdGavel size={18} />Legal</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div className={sectionClass}>
            <div className={titleClass}>Customer Service</div>
            <ul className="space-y-1">
              <li><div className="flex items-center gap-1"><MdEmail size={18} />softeng310project@gmail.com</div></li>
              <li><div className="flex items-center gap-1"><MdPhone size={18} />+64 9 123 4567</div></li>
            </ul>
          </div>
          
          {/* My Account */}
          <div className={sectionClass}>
            <div className={titleClass}>My Account</div>
            <ul className="space-y-1">
              <li><a href="/not-implemented" className={linkClass}><MdAccountCircle size={18} />My account</a></li>
              <li><a href="/not-implemented" className={linkClass}><MdOutlineShoppingCart size={18} />Order History</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}