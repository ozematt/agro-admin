import PropertyLink from "./PropertyLink";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";

const NAV_ITEMS = [
  {
    id: "1",
    name: "Domek_1",
  },
  {
    id: "2",
    name: "Domek_2",
  },
  {
    id: "3",
    name: "Domek_3",
  },
] as const;

const NavItems = () => {
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
            {NAV_ITEMS.map((item) => (
              <PropertyLink key={item.id} propertyName={item.name} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavItems;
