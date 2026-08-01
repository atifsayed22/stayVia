import API from "../api/axios";

const getListings = async () => {
    const {data} = await API.get("/listing");
    return data;
}

// const addListings = async(listingData) =>{
//     const  respons1e = await API.post("/listing" , listingData);
//     return response 
// }

const createListing = async (formData) => {
  const { data } = await API.post(
    "/listing",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};


const getListingById = async (listingId) => {

    const {data} = await API.get(`/listing/${listingId}`);
    return data;
}

const listingService = {
    getListings,
    getListingById ,
    createListing,
};

export default listingService;
