import React from 'react';
import { Briefcase, HelpCircle, Gift } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white">
      <div className="container mx-auto max-w-[1248px] px-4 md:px-8 py-6 md:py-10 flex flex-wrap justify-between border-b border-[#454d5e] gap-y-4 md:gap-y-0">
        <div className="flex flex-col gap-2 w-[50%] md:w-[20%]">
          <h4 className="text-[#878787] text-[12px] font-medium uppercase mb-2">About</h4>
          <ul className="flex flex-col gap-1 text-[12px] font-medium text-white">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-[50%] md:w-[20%]">
          <h4 className="text-[#878787] text-[12px] font-medium uppercase mb-2">Help</h4>
          <ul className="flex flex-col gap-1 text-[12px] font-medium text-white">
            <li><a href="#" className="hover:underline">Payments</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-[50%] md:w-[20%] mt-6 md:mt-0">
          <h4 className="text-[#878787] text-[12px] font-medium uppercase mb-2">Policy</h4>
          <ul className="flex flex-col gap-1 text-[12px] font-medium text-white">
            <li><a href="#" className="hover:underline">Return Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-[50%] md:w-[20%] mt-6 md:mt-0">
          <h4 className="text-[#878787] text-[12px] font-medium uppercase mb-2">Social</h4>
          <ul className="flex flex-col gap-1 text-[12px] font-medium text-white">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">YouTube</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[20%] pl-0 md:pl-6 border-l-0 md:border-l border-[#454d5e] mt-6 md:mt-0">
          <h4 className="text-[#878787] text-[12px] font-medium uppercase mb-2">Mail Us:</h4>
          <p className="text-[12px] text-white leading-relaxed">
            Flipkart Internet Private Limited,<br/>
            Buildings Alyssa, Begonia &<br/>
            Clove Embassy Tech Village,<br/>
            Outer Ring Road, Devarabeesanahalli Village,<br/>
            Bengaluru, 560103,<br/>
            Karnataka, India
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-[1248px] px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row flex-wrap items-center justify-between gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-6 text-[12px] text-white">
          <a href="#" className="flex items-center gap-2 hover:underline"><Briefcase size={14} color="#ff9f00" /> Become a Seller</a>
          <a href="#" className="flex items-center gap-2 hover:underline"><Gift size={14} color="#ff9f00" /> Gift Cards</a>
          <a href="#" className="flex items-center gap-2 hover:underline"><HelpCircle size={14} color="#ff9f00" /> Help Center</a>
        </div>
        <div className="text-[12px] text-white">
          &copy; 2007-2024 Flipkart.com
        </div>
        <div className="flex gap-2">
          {/* Payment method icons placeholder */}
          <div className="w-[180px] h-4 bg-[url('https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg')] bg-contain bg-no-repeat bg-right"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
