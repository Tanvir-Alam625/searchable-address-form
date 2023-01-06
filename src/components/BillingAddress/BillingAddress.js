import { useEffect, useRef, useState } from "react";
import useCountries from "../../hooks/useCountries";
import SelectOption from "./SelectOption";

const BillingAddress = ({country}) =>{
    const countryRef = useRef()
    const [toggle, setToggle] = useState({clicked:''})
    const {countries} = useCountries()
    const [searchedCountries, setSearchedCountries] = useState(null);
    
    useEffect(()=> {
        // console.log(searchedCountries)
    }, [toggle, searchedCountries])
    
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
            setSearchedCountries(()=> searchedData)
        }
     }
    // select country value function 
    const handleCountryValue = (name) =>{
        address.country = name
        setToggle({clicked:''})
        console.log(address);
    }
    return(
        <div className="bill-address">
            <form action="" method="">
                <h3>
                    Billing Address
                </h3>
                <h4>Attention</h4>
                <div className="input-group">
                <label for="country">Country</label>
                    <div id="country" ref={countryRef} onClick={()=>getToggle('country')}  className="countries">
                        <p>{address.country}</p>
                        <div className="icon-container">
                            <svg className={`icon ${toggle.clicked === 'country'? 'active':''}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`select-container ${toggle.clicked === 'country'? 'active':''}`}>
                        <input placeholder="Search here" className="search" type="text"  onChange={handleSearch}/>
                        <div className="select-items">
                            <ul className="select">
                                {/* initialize load tag */}
                                {
                                    searchedCountries === null && <span>Search Your Country</span>
                                }
                                {/* no data show tag  */}
                                {
                                    searchedCountries !== null && searchedCountries.length <= 0 && <span> Oops! No Countries Show</span>
                                }
                                {/* show the searched country */}
                                {
                                    searchedCountries?.map((country)=> <li className="option" onClick={()=>handleCountryValue(country.name)} key={country.id}  >{country.name}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default BillingAddress;