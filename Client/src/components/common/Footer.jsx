import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">PropertyHub</h2>
          <p className="text-sm text-gray-400 mb-4">
            Your trusted real estate partner for buying and renting properties
            across the country.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-500">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sky-500">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Properties
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@propertyhub.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Mumbai, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-4">
            Get updates on new listings.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-0.5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} PropertyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
