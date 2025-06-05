import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-700">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-700">Terms of Service</Link>
          <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-700">Contact Us</Link>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {currentYear} YourBank Financial Services. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          YourBank is a fictional entity for demonstration purposes.
        </p>
      </div>
    </footer>
  );
}
export default Footer;