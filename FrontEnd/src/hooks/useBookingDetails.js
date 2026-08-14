import {useEffect , useState} from "react";
import {getBookingById} from "../services/bookingService";

export function useBookingDetails(bookingId){
    const [booking , setBooking] = useState(null) ;
    const [loading , setLoading] = useState(false) ;
    const [error , setError] = useState(null) ;

    const fetchBookingDetails = async()=>{
        try{
            setLoading(true) ; 
            setError("") ;
            const data = await getBookingById(bookingId) ;
            setBooking(data) 

        }catch(err){
            setError(err) ;
        }finally{
            setLoading(false) ;
        }
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if(bookingId) fetchBookingDetails() ;
    } , [bookingId])

    return {
        booking , 
        loading , 
        error , 
    }
    
}