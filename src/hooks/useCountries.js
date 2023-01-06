import { useEffect, useState } from "react";

const useCountries =  () =>{
    const [countries, setCountries] =useState([]);
    useEffect(()=>{
        fetch("countries.json")
        .then(res=>res.json())  
        .then(data=>setCountries(data))
    },[])
    return {countries} 
}
export default useCountries;