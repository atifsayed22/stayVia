export default function ListingInfo({ listing }) {
  return (
    <section className="space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {listing.title}
        </h1>

        <p className="mt-3 text-slate-500">
          {listing.address?.city}
          {listing.address?.state && `, ${listing.address.state}`}, {listing.address?.country}
        </p>
      </div>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">

        <span className="font-semibold">
          ⭐ {listing.averageRating.toFixed(1)}
        </span>

        <span>
          ({listing.reviewCount} reviews)
        </span>

        <span>
          Hosted by{" "}
          <span className="font-semibold">
            @{listing.owner?.username || "Host"}
          </span>
        </span>

      </div>

      {/* Property Details */}
      <div className="flex flex-wrap gap-3">

        <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600">
          {/* {listing?.propertyType} */}
       <p className="text-xs uppercase tracking-wide text-slate-500">
            Property Type 
          </p>
        {listing?.propertyType}
        </span>

        <span className="rounded-full bg-slate-100 font-semibold px-4 py-2  text-rose-600">
       <p className="text-xs uppercase tracking-wide text-slate-500">
            Room Type 
          </p>
          {listing.roomType}
        </span>

      </div>

      {/* Capacity */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Guests
          </p>

          <p className="mt-2 text-lg font-semibold">
            {listing.maxGuests}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Bedrooms
          </p>

          <p className="mt-2 text-lg font-semibold">
            {listing.bedrooms}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Beds
          </p>

          <p className="mt-2 text-lg font-semibold">
            {listing.beds}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Bathrooms
          </p>

          <p className="mt-2 text-lg font-semibold">
            {listing.bathrooms}
          </p>
        </div>

      </div>

      {/* Description */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-semibold text-slate-900">
          About this place
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          {listing.description}
        </p>

      </div>

    </section>
  );
}