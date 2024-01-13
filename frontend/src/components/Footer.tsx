// Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Your Company Name &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs mt-1">
          Address | Phone: (123) 456-7890 | Email: info@example.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
