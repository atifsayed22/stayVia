import { formatPrice } from "../../utils/listingUtils";

export default function BookingCard({ listing }) {
  return (
    <div className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-900">
          ₹ {formatPrice(listing.price)}
        </span>

        <span className="pb-1 text-slate-500">
          / night
        </span>
      </div>

      {/* Booking Form */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-300">

        <div className="grid grid-cols-2">

          <div className="border-r border-b p-4">
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Check In
            </label>

            <input
              type="date"
              className="mt-2 w-full border-none p-0 text-sm outline-none"
            />
          </div>

          <div className="border-b p-4">
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Check Out
            </label>

            <input
              type="date"
              className="mt-2 w-full border-none p-0 text-sm outline-none"
            />
          </div>

        </div>

        <div className="p-4">

          <label className="block text-xs font-semibold uppercase text-slate-500">
            Guests
          </label>

          <select className="mt-2 w-full border-none bg-transparent outline-none">

            {Array.from(
              { length: listing.maxGuests },
              (_, i) => (
                <option key={i + 1}>
                  {i + 1} Guest{i > 0 ? "s" : ""}
                </option>
              )
            )}

          </select>

        </div>

      </div>

      {/* Reserve */}

      <button
        className="mt-6 w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600"
      >
        Reserve
      </button>

      <p className="mt-3 text-center text-sm text-slate-500">
        You won't be charged yet.
      </p>

      {/* Price Breakdown */}

      <div className="mt-8 space-y-3 text-sm">

        <div className="flex justify-between">
          <span>₹ {formatPrice(listing.price)} × 1 night</span>
          <span>₹ {formatPrice(listing.price)}</span>
        </div>

        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>₹ 500</span>
        </div>

        <div className="flex justify-between">
          <span>Service fee</span>
          <span>₹ 800</span>
        </div>

        <hr />

        <div className="flex justify-between text-base font-semibold">

          <span>Total</span>

          <span>
            ₹ {formatPrice(listing.price + 500 + 800)}
          </span>

        </div>

      </div>

    </div>
  );
}