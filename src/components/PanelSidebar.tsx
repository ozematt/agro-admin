"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logout from "./Logout";
import NavItems from "./NavItems";
import Link from "next/link";
import { Crown } from "lucide-react";

type SidebarProps = React.ComponentProps<typeof Sidebar>;

type Props = {
  propetyName: string[];
} & SidebarProps;

const PanelSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-12 data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/panel" className="space-x-2">
                <Crown className="size-5!" />
                <div>
                  <p className="text-base font-semibold">AdminPanel.</p>
                  <p className="text-xs opacity-50">System zarządzania</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavItems />
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
};

export default PanelSidebar;
