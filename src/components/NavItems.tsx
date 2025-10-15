import PropertyLink from "./PropertyLink";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";

const properties = [
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
];
const NavItems = () => {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarGroupLabel className="mb-[-15px] mt-3">
            Obiekty
          </SidebarGroupLabel>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {properties.map((property) => (
              <PropertyLink key={property.id} property={property} />
            ))}{" "}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavItems;
