export default function Amenities({ listing }) {
  const amenities = listing.amenities || [];
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        What this place offers
      </h2>

      {amenities.length === 0 ? (
        <p className="mt-4 text-slate-500">
          No amenities added yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
            >
              <span className="text-xl">✓</span>

              <span className="font-medium text-slate-700">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}