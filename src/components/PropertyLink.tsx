"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { type HouseItem } from "@/config";

interface Props {
  property: HouseItem;
}

const PropertyLink = ({ property }: Props) => {
  return (
    <Link href={`/panel/${property.slug}`}>
      <SidebarMenuItem>
        <Suspense
          fallback={<Skeleton className="h-7 w-65" key={property.name} />}
        >
          <LinkWrapper property={property} />
        </Suspense>
      </SidebarMenuItem>
    </Link>
  );
};

export default PropertyLink;

// NOTE: for cacheComponents
const LinkWrapper = ({ property }: Props) => {
  const pathname = usePathname();
  const href = `/panel/${property.slug}`;
  const isActive = pathname === href;

  return (
    <SidebarMenuButton
      title={property.name}
      className={`${
        isActive &&
        "bg-primary hover:bg-primary dark:text-primary-foreground text-white hover:text-white/80"
      }`}
    >
      <property.Icon />
      {property.name}
    </SidebarMenuButton>
  );
};
