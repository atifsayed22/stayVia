export default function LocationSection({ formData, handleAddressChange }) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Location</h2>

      <p className="mt-2 text-sm text-slate-500">
        Tell guests where your property is located.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={formData.address.city}
            onChange={handleAddressChange}
            placeholder="Mumbai"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            State
          </label>

          <input
            id="state"
            name="state"
            type="text"
            value={formData.address.state}
            onChange={handleAddressChange}
            placeholder="Maharashtra"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <label
            htmlFor="country"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Country
          </label>

          <input
            id="country"
            name="country"
            type="text"
            value={formData.address.country}
            onChange={handleAddressChange}
            placeholder="India"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="street"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Street Address
          </label>

          <input
            id="street"
            name="street"
            type="text"
            value={formData.address.street}
            onChange={handleAddressChange}
            placeholder="221B Baker Street"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>
        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Postal Code
          </label>

          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.address.postalCode}
            onChange={handleAddressChange}
            placeholder="400050"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>
      </div>

      {/* Future Feature */}
      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <h3 className="font-medium text-slate-900">📍 Map Location</h3>

        <p className="mt-2 text-sm text-slate-500">
          After submitting the listing, StayVia will automatically convert this
          location into map coordinates using Mapbox. Guests will only see the
          approximate location until they complete a booking.
        </p>
      </div>
    </section>
  );
}
