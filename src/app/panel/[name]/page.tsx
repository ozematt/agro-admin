// import MyCalendar from "@/components/UnitCalendar";
import {
  PropertyCalendar,
  PropertyGallery,
  PropertyReservation,
} from "@/components";

// Symulacja wolnego ładowania
// async function slowData() {
//   await new Promise((resolve) => setTimeout(resolve, 13000)); // 13 sekundy
//   return { data: "loaded" };
// }

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  // await slowData();

  const { name } = await params;

  return (
    <div className="space-y-6">
      <PropertyCalendar />
      <PropertyReservation />
      <PropertyGallery />
    </div>
  );
};

export default PropertyPage;
