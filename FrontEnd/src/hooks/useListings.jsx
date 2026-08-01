import { useEffect, useState } from "react";
import listingService from "../services/listingService";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    try {
      const data = await listingService.getListings();
      console.log("Fetched listings:", data.listings); // Log the fetched listings for debugging
      setListings(data.listings);
   
    } catch (err) {
        if (!err.response) {
        setError("Cannot connect to the server.");
    } else {
        setError(err.response.data.message || "Failed to load listings.");
    }
    }finally{
        
        setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListings();
  }, []); ; 

    return { listings, loading, error };
}
