import React from 'react';
import { 
  SiX, 
  SiFacebook, 
  SiPinterest, 
  SiInstagram 
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6'; // Import LinkedIn từ FontAwesome
import { TbWorld, TbAccessible } from 'react-icons/tb';

export default function FooterBottom() {
  return (
    <div className="container mx-auto px-6 bg-white border-t border-gray-200 py-6 text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Bên trái: Logo + Copyright */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-black tracking-tighter text-gray-800">
            fiverr<span className="text-[#1dbf73]">.</span>
          </span>
          <span className="text-xs text-gray-400">
            © Fiverr International Ltd. 2026
          </span>
        </div>

        {/* Bên phải: Social Icons + Local Settings */}
        <div className="flex flex-wrap items-center justify-start space-x-6 text-gray-600">
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <SiX className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors" aria-label="Facebook">
              <SiFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors" aria-label="Pinterest">
              <SiPinterest className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors" aria-label="Instagram">
              <SiInstagram className="w-5 h-5" />
            </a>
          </div>

          {/* Language / Currency / Accessibility */}
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <button className="flex items-center space-x-1 hover:bg-gray-100 p-1.5 rounded transition">
              <TbWorld className="w-4 h-4" />
              <span>English</span>
            </button>

            <button className="hover:bg-gray-100 p-1.5 rounded transition">
              $USD
            </button>

            <button className="hover:bg-gray-100 p-1.5 rounded-full transition" aria-label="Accessibility settings">
              <TbAccessible className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}