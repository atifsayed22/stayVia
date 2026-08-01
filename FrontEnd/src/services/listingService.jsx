import API from "../api/axios";

const getListings = async () => {
    const {data} = await API.get("/listing");
    return data;
}

// const addListings = async(listingData) =>{
//     const  respons1e = await API.post("/listing" , listingData);
//     return response 
// }

const addListing = async(listingData) =>{
    const response = await API.post("/listing", listingData);
    return response.data;
}


const getListingById = async (listingId) => {

    const {data} = await API.get(`/listing/${listingId}`);
    return data;
}

const listingService = {
    getListings,
    getListingById ,
    addListing
};

export default listingService;
