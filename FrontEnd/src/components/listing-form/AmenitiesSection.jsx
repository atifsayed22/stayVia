const amenitiesList = [
  "Wifi",
  "Kitchen",
  "Air Conditioning",
  "Parking",
  "Pool",
  "Gym",
  "Workspace",
  "TV",
  "Washing Machine",
  "Balcony",
  "Breakfast",
  "Garden",
];

export default function AmenitiesSection({
  formData,
  handleAmenityChange,
}) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Amenities
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Select the amenities available at your property.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {amenitiesList.map((amenity) => (
          <label
            key={amenity}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-slate-400"
          >
            <input
              type="checkbox"
              checked={formData.amenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="h-5 w-5"
            />

            <span className="text-slate-700">
              {amenity}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}