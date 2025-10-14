"use client";

// import { properties } from '@/database/schema';
import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Logout from "./Logout";
import PropertyLink from "./PropertyLink";

interface Property {
  id: string;
  name: string;
  icon: string;
  beds: number;
  baths: number;
  slug?: string;
}

interface Props {
  properties: Property[];
}

const properties = [
  {
    id: "1",
    name: "Domek_1",
    beds: 2,
    baths: 1,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "2",
    name: "Domek_2",
    beds: 4,
    baths: 2,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "3",
    name: "Domek_3",
    beds: 6,
    baths: 3,
    icon: "/panel_icons/house.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-dark-blue h-full min-h-screen w-72 px-8 py-6 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">AdminPanel</h1>
        <p className="text-sm text-slate-400">System zarządzania</p>
      </div>

      <nav className="space-y-2">
        <Link
          href={"/panel"}
          className={`mb-5 flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
            pathname === "/panel"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Settings size={20} />
          Panel
        </Link>
        <p className="text-xs text-slate-400">Obiekty</p>
        {properties.map((property) => (
          <PropertyLink key={property.id} property={property} />
        ))}
        <div className="mt-10">
          <Logout />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
