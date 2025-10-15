"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const Logout = () => {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <form>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={logout}>
            <LogOut />
            <span>Wyloguj</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </form>
  );
};

export default Logout;
