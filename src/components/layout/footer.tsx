"use client";

import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaPhoneAlt, 
    FaMapMarkerAlt, 
    FaEnvelope 
} from "react-icons/fa";
import { usePathname } from "next/navigation";

function Footer() {
    const pathname = usePathname();
    
       if (pathname.startsWith("/admin") || pathname === "/not-found") {
        return null;
      }
  return (
    <footer className="bg-[#6F4E37] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Kindi Coffee Shop</h2>
            <p className="text-gray-200">
              Brewing the perfect coffee experience in Rwanda. Freshly roasted, locally sourced.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-300">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-1 text-gray-200">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/menu" className="hover:text-white">Menu</a></li>
              <li><a href="/staff" className="hover:text-white">Staff</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-2">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> +250 000 000 000
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> info@kindicoffee.rw
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> Kigali, Rwanda
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-4">Opening Hours</h3>
            <ul className="space-y-1 text-gray-200">
              <li>Mon - Fri: 7:00 AM - 8:00 PM</li>
              <li>Sat - Sun: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Kindi Coffee Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
