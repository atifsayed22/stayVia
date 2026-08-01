const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Cabin",
  "Farmhouse",
  "Hotel",
  "Resort",
];

const roomTypes = [
  "Entire Place",
  "Private Room",
  "Shared Room",
];

export default function PropertyDetailsSection({
  formData,
  handleChange,
}) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Property Details
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Help guests understand what they'll be booking.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Property Type */}
        <div>
          <label
            htmlFor="propertyType"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Property Type
          </label>

          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Room Type */}
        <div>
          <label
            htmlFor="roomType"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Room Type
          </label>

          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Max Guests */}
        <div>
          <label
            htmlFor="maxGuests"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Max Guests
          </label>

          <input
            id="maxGuests"
            name="maxGuests"
            type="number"
            min="1"
            value={formData.maxGuests}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label
            htmlFor="bedrooms"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Bedrooms
          </label>

          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Beds */}
        <div>
          <label
            htmlFor="beds"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Beds
          </label>

          <input
            id="beds"
            name="beds"
            type="number"
            min="1"
            value={formData.beds}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label
            htmlFor="bathrooms"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Bathrooms
          </label>

          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="1"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

      </div>
    </section>
  );
}