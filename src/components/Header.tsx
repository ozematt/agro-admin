"use client";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const title = pathname.split("/")[2]
    ? (
        pathname.split("/")[2].charAt(0).toUpperCase() +
        pathname.split("/")[2].slice(1)
      )
        .split("-")
        .join(" ")
    : "Panel";

  return (
    <>
      <div className="border-slate-200 bg-white p-6">
        <h2 className="bg-white text-2xl font-bold text-slate-900">{title}</h2>
      </div>
    </>
  );
};

export default Header;
