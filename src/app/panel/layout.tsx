import {
  Header,
  MobileBottomNavigation,
  MobileHeader,
  MobilePropertyList,
  Sidebar,
} from "@/components";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

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

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen">
        <div className="block lg:hidden">
          <MobileHeader />
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="hidden lg:block">
            <Header />
          </div>
          <div className="flex w-full bg-gray-200 pt-18 lg:pt-0">
            <div className="w-full p-4 md:p-8">
              <div className="block lg:hidden">
                <MobilePropertyList />
              </div>
              {children}
              <div className="block lg:hidden">
                <MobileBottomNavigation />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
