import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Drone,} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* 🛒 Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 flex items-center space-x-2">
            <Drone/>
            <span>Tech-Cart</span>
          </h2>
          <p className="text-sm mt-3 leading-relaxed">
            Powering your world with the best in electronics and unbeatable deals.
          </p>

          <div className="mt-4 text-sm space-y-1">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>Email: support@kart.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* 🧾 Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            {["Contact Us", "Shipping & Returns", "FAQs", "Order Tracking", "Size Guide"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-pink-400 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* 🌐 Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-pink-400 transition"><Facebook /></a>
            <a href="#" className="hover:text-pink-400 transition"><Instagram /></a>
            <a href="#" className="hover:text-pink-400 transition"><Twitter /></a>
            <a href="#" className="hover:text-pink-400 transition"><Linkedin /></a>
          </div>
        </div>

        {/* ✉️ Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay in the Loop</h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 🔻 Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2025 <span className="text-pink-500 font-semibold">Tech-Cart</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
