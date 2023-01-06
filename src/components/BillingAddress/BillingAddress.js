import { useEffect, useRef, useState } from "react";
import useCountries from "../../hooks/useCountries";
import SelectOption from "./SelectOption";

const BillingAddress = ({country}) =>{
    const countryRef = useRef()
    const [toggle, setToggle] = useState({clicked:''})
    const {countries} = useCountries()
    const [sc, setsc] = useState(null);
    let searchedData = []
    
    useEffect(()=> {
        console.log(sc)
    }, [toggle, sc])
    
    // address data
    const placeholderName = 'Please Search'
    const address = {
        country: placeholderName,
        division: placeholderName,
        district: placeholderName,
        city: placeholderName,
        Union: placeholderName,
        zipcode:placeholderName,
        village: placeholderName,
        houseNumber:"HD899",
        phone: '+88017000000',
        fax:'888888888'
    }
    // toggle selection functionality 
    const getToggle = clicked => toggle.clicked ? setToggle({clicked:''}) :  setToggle({clicked:clicked})
    // search functionality
     const handleSearch = (event) => {
      const searchValue = event.target.value.toLowerCase()
      if(countries.length > 0){
        const searchedData = countries.filter(country => country.name.toLowerCase().startsWith(searchValue))
        setsc(()=> searchedData)
      }
     }
    
    return(
        <div className="bill-address">
            <form action="" method="">
                <h3>
                    Billing Address
                </h3>
                <h4>Attention</h4>
                <div className="input-group">
                    <div ref={countryRef} onClick={()=>getToggle('country')}  className="countries">
                       {address.country}
                    </div>
                    <div className="select-container">
                        <input className="search" type="text"   onChange={handleSearch}/>
                        <ul className="select">
                           {
                            countries.map((country)=> <li className="option" key={country.id}  >{country.name}</li>)
                           }
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default BillingAddress;