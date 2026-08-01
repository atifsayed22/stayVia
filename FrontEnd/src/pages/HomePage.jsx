import { Link } from "react-router-dom";
import CategoryRail from "../components/home/CategoryRail";
import Hero from "../components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRail />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "Book unique stays",
              "Explore apartments, villas, cabins, and hotels with a simple booking experience.",
            ],
            [
              "Become a host",
              "List your property, manage reservations, and grow your hosting business from one dashboard.",
            ],
            [
              "Built for the future",
              "StayVia is designed with secure authentication, booking management, reviews, and payments in mind.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[2rem] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#111827] p-8 text-white shadow-2xl shadow-black/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-300">
                Hosting
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                Start earning by hosting your property.
              </h2>

              <p className="mt-3 max-w-2xl text-white/70">
                Publish your listings, manage bookings, update pricing,
                and monitor your hosting business from one dedicated dashboard.
              </p>
            </div>

            <Link
              to="/host/dashboard"
              className="inline-flex h-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}