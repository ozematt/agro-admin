"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components";
import { usePathname } from "next/navigation";
import { createTitle } from "@/utils/helpers";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const PanelSiteHeader = () => {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Suspense fallback={<Skeleton className="h-4 w-40" />}>
          <SiteHeaderWrapper />
        </Suspense>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default PanelSiteHeader;

// NOTE: for cachComponents, coz params are in use
const SiteHeaderWrapper = () => {
  const pathname = usePathname();

  const title = createTitle(pathname);

  return <p className="text-base font-medium">{title}</p>;
};
