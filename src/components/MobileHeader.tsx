"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">AdminPanel</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
