"use client";

import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createSlug } from "@/lib/helpers";

interface Props {
  property: { id: string; name: string };
  mobile?: boolean;
}

const PropertyLink = ({ property, mobile }: Props) => {
  // DATA
  const pathname = usePathname();
  const slug = createSlug(property.name);
  const href = `/panel/${slug}`;
  const isActive = pathname === href;

  //   UI
  return (
    <Link
      key={property.id}
      href={`/panel/${createSlug(property.name)}`}
      className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
        isActive
          ? "bg-blue-600 font-bold text-white"
          : `${mobile ? "bg-gray-50 font-bold text-slate-900 hover:bg-blue-100" : "text-slate-300 hover:bg-slate-800"}`
      }`}
    >
      <House size={20} />
      {property.name}
    </Link>
  );
};

export default PropertyLink;
