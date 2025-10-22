import CalendarWrapper from "@/components/CalendarWrapper";

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  // await slowData();

  const { name } = await params;
  console.log(name);

  return (
    <div className=" p-4  md:p-6">
      <CalendarWrapper />
    </div>
  );
};

export default PropertyPage;
