"use client";

import { Building2 } from "lucide-react";
import { PropertyLink, SectionTitle } from "@/components";

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

const MobilePropertyList = () => {
  return (
    <section className="sectionContainer space-y-6">
      <SectionTitle Icon={Building2} title="Obiekty" />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        {properties.map((property) => (
          <PropertyLink key={property.id} property={property} mobile />
        ))}
      </div>
    </section>
  );
};

export default MobilePropertyList;
