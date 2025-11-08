import { ReactNode, Suspense } from "react";
import { PanelSidebar, PanelSiteHeader } from "@/components";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <PanelSidebar variant="inset" />
          <SidebarInset>
            <Suspense fallback={<div>Loading...</div>}>
              <PanelSiteHeader />
            </Suspense>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
};

export default Layout;
