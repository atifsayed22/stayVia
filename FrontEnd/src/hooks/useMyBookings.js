import {useEffect, useState} from "react";
import {getUserBookings} from "../services/bookingService";

export function useMyBookings() {
    const [bookings, setBookings] = useState(null) ; 
    const [loading , setLoading] = useState(false) ; 
    const [error , setError] = useState(null) ;

    const fetchBookings = async ()=>{
        try{
            setLoading(true) ; 
            setError("") ;
            const data = await getUserBookings() ; 
        
            setBookings(data)
        }catch(err){
            setError(err) ;
        }finally{
            setLoading(false) ;
        }
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBookings() ;
    } , [])


    return {
        bookings , 
        loading , 
        error , 
    }
}