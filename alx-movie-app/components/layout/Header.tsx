import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold">CineSeek</Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-[#E2D609]">Home</Link>
          <Link href="/movies" className="hover:text-[#E2D609]">Movies</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
