"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import PropertyLink from "./PropertyLink";
import { PROPERTIES } from "@/config";

const NavItems = () => {
  const propertyList = PROPERTIES.map((el) => el.name);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarGroupLabel className="mt-3 mb-[-15px]">
            Obiekty
          </SidebarGroupLabel>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {propertyList.map((item, index) => (
              <PropertyLink key={index} propertyName={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavItems;
