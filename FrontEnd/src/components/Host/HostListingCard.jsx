import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/listingUtils";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";

export default function HostListingCard({ listing, deleteListing }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteListing(listing._id);

      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };
  const image =
    listing.images?.length > 0
      ? listing.images[0].url
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <>
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56">
        <img
          src={image}
          alt={listing.title}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            listing.status === "published" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {listing.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {listing.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{listing.propertyType}</p>

        <p className="mt-2 text-sm text-slate-500">
          {listing.address?.city}, {listing.address?.country}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-slate-900">
              ₹ {formatPrice(listing.price)}
            </p>

            <p className="text-sm text-slate-500">per night</p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-slate-900">
              ⭐ {listing.averageRating}
            </p>

            <p className="text-sm text-slate-500">
              {listing.reviewCount} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex border-t">
        <Link
          to={`/listings/${listing._id}`}
          className="flex-1 border-r py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View
        </Link>

        <Link
          to={`/host/listings/${listing._id}/edit`}
          className="flex-1 border-r py-3 text-center text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="flex-1 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>

    </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Listing"
        message="Are you sure you want to permanently delete this listing? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
