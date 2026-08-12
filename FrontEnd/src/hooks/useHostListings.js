import { useEffect, useState } from "react";
import listingService from "../services/listingService";
import toast from "react-hot-toast";

export function useHostListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    try {
      setLoading(true);

      const response = await listingService.getMyListings();

      setListings(response.listings || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load listings.");
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    await toast.promise(
      listingService.deleteListing(id),
      {
        loading: "Deleting listing...",
        success: "Listing deleted successfully",
        error: "Failed to delete listing",
      }
    );

    setListings((prev) =>
      prev.filter((listing) => listing._id !== id)
    );
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    fetchListings,
    deleteListing,
  };
}