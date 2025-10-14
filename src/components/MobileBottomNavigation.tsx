"use client";

import { useState } from "react";
import { Calendar, Home, Settings } from "lucide-react";

const bottomNavItems = [
  { id: "home", name: "Główna", icon: Home },
  { id: "calendar", name: "Kalendarz", icon: Calendar },
  { id: "settings", name: "Ustawienia", icon: Settings },
];

const MobileBottomNavigation = () => {
  const [activeNavItem, setActiveNavItem] = useState("home");

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-10 border-t border-gray-200 bg-white shadow-lg">
      <div className="flex justify-around py-3">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNavItem(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 transition-colors duration-200 ${
                activeNavItem === item.id
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <IconComponent size={20} />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
