export default function Footer() {
  return (
    <footer className="w-full mt-12">
      {/* Newsletter Bar */}
      <div className="bg-[#6E8EBE] py-6 px-4 flex flex-col md:flex-row items-center justify-between"></div>
      {/* Footer Links */}
      <div className="bg-[#FFDBC2] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* About Us */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">About us</div>
            <ul className="space-y-1">
              <li><a href="/about" className="text-[#385684] hover:text-[#27406a] transition-colors">About us</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Legal</a></li>
            </ul>
          </div>
          {/* Customer Service */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">Customer service</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Contact us</a></li>
            </ul>
          </div>
          {/* My Account */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#333] mb-2">My account</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">My account</a></li>
              <li><a href="#" className="text-[#385684] hover:text-[#27406a] transition-colors">Order History</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}