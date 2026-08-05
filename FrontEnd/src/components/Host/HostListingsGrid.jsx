import HostListingCard from "./HostListingCard";

export default function HostListingGrid({ listings, deleteListing }) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <HostListingCard
          key={listing._id}
          listing={listing}
          deleteListing={deleteListing}
        />
      ))}
    </div>
  );
}
