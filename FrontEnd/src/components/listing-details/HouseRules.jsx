export default function HouseRules({ listing }) {
  const houseRules = listing.houseRules || [];

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        House Rules
      </h2>

      {houseRules.length === 0 ? (
        <p className="mt-4 text-slate-500">
          No house rules provided.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {houseRules.map((rule) => (
            <div
              key={rule}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
            >
              <span className="text-lg">•</span>

              <span className="text-slate-700">
                {rule}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
