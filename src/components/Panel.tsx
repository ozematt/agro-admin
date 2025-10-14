"use client";

const reservations = [
  {
    startDate: "2024-06-15",
    endDate: "2024-06-20",
    roomNumber: "101",
  },
  // więcej rezerwacji...
];

const Panel = ({ properties }: any) => {
  // UI
  return (
    <>
      <div className="">
        {/* <form
          action={handleSubmit}
          className="ring-2 ring-amber-800 flex flex-col justify-center items-center gap-3"
        >
          <p>wybierz obiekt</p>
          <select
            name="property"
            id="property"
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-amber-200"
            value={selectedProperty}
          >
            <option value="">wybierz</option>
            {properties.map((property, index) => (
              <option key={index} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <p>zdjęcia które chcesz dodać:</p>
            <ImageUpload onImageUpload={handleImageData} />
          </div>
          <button type="submit" className="bg-amber-700 p-3">
            Submit
          </button>
        </form> */}
        {/* <Calendar reservations={reservations} /> */}
        {/* <Logout /> */}
      </div>
    </>
  );
};

export default Panel;
