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


const updateListing = async (id , formData) =>{
  const response = await API.put(`/listing/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}


const getListingById = async (listingId) => {

    const {data} = await API.get(`/listing/${listingId}`);
    return data;
}

const getMyListings = async () => {
    const {data} = await API.get("/listing/my");
    return data;
}

const deleteListing = async(listingId) =>{
  const {data} = await API.delete(`/listing/${listingId}`)
  return data ; 
}

const listingService = {
    getListings,
    getListingById ,
    createListing,
    getMyListings,
    updateListing,
    deleteListing
};

export default listingService;
