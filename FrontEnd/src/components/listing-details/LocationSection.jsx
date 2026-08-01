export default function LocationSection({ listing }) {
  const { city, state, country } = listing.address;

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Where you'll be
      </h2>

      <p className="mt-2 text-slate-600">
        {city}
        {state && `, ${state}`}, {country}
      </p>

      {/* Map Placeholder */}
      <div className="mt-6 flex h-80 items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50">
        <div className="text-center">
          <div className="text-5xl">📍</div>

          <p className="mt-3 font-medium text-slate-700">
            Interactive map coming soon
          </p>

          <p className="mt-1 text-sm text-slate-500">
            This section will display the property's location using Mapbox.
          </p>
        </div>
      </div>
    </section>
  );
}