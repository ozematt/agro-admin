"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { createSlug } from "@/utils/helpers";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { PROPERTIES } from "@/config";

interface Props {
  propertyName: string;
}

const PropertyLink = ({ propertyName }: Props) => {
  return (
    <Link href={`/panel/${createSlug(propertyName)}`}>
      <SidebarMenuItem>
        <Suspense
          fallback={<Skeleton className="h-7 w-65" key={propertyName} />}
        >
          <LinkWrapper propertyName={propertyName} />
        </Suspense>
      </SidebarMenuItem>
    </Link>
  );
};

export default PropertyLink;

// NOTE: for cacheComponents
const LinkWrapper = ({ propertyName }: Props) => {
  const pathname = usePathname();
  const slug = createSlug(propertyName);
  const href = `/panel/${slug}`;
  const isActive = pathname === href;
  const Icon = PROPERTIES.find((el) => el.name === propertyName)
    ?.icon as React.ElementType;

  return (
    <SidebarMenuButton
      tooltip={propertyName}
      className={`${
        isActive &&
        "bg-primary hover:bg-primary dark:text-primary-foreground text-white hover:text-white/80"
      }`}
    >
      <Icon />
      {propertyName}
    </SidebarMenuButton>
  );
};
