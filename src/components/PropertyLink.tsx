"use client";

import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createSlug } from "@/lib/helpers";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Props {
  property: { id: string; name: string };
  mobile?: boolean;
}

const PropertyLink = ({ property }: Props) => {
  // DATA
  // const pathname = usePathname();
  const slug = createSlug(property.name);
  const href = `/panel/${slug}`;
  // const isActive = pathname === href;

  //   UI
  return (
    <Link href={`/dashboard/${createSlug(property.name)}`}>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={property.name} className="">
          <House />
          {property.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default PropertyLink;
