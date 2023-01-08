import { useEffect, useState } from "react";

// const useCountries =  () =>{
//     const [countries, setCountries] =useState([]);
//     const [isLoading, setIsLoading] = useState(true)
//     useEffect(()=>{
//         fetch("countries.json")
//         .then(res=>res.json())  
//         .then(data=>{
//             setIsLoading(false)
//             setCountries(data)
//         })
//     },[])
//     return {countries, isLoading} 
// }
//  load division function 
const useDivision = ()=> {
    const [isLoading, setIsLoading] = useState(true)
    const [divisions, setDivisions] =useState([]);
    const url = `https://bicycle-pars-tanvir-alam625.onrender.com/bd/divisions`
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setDivisions(data)
            setIsLoading(false)
        })
    },[url])
    return {divisions, isLoading} 
}
export default useDivision;