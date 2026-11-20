import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} CineSeek. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
