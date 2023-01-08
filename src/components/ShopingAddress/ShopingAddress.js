import { useEffect, useReducer,  useState } from "react";
import useDivision from "../../hooks/useDivision";
import { billingReducer, shoppingReducer} from "../../state/action";
import { billingAddress, shopingAddress } from "../../state/state";
  

const ShopingAddress = ({setModal}) =>{
    const [toggle, setToggle] = useState({clicked:''})
    const [loading, setLoading] = useState(false);
    // division 
    const {divisions, isLoading} =useDivision()
    const [searchedDivisions, setSearchedDivisions] = useState(null);
    const [divisionName, setDivisionName] = useState('Please Search')
    // district 
    const [districtName, setDistrictName] = useState('Please Search')
    const [districts, setDistricts] = useState([])
    const [searchedDsitrict, setSearchedDsitrict] = useState(null);
    // upozila 
    // const [upozilaName, setUpozilaName] = useState('Please Search')
    // const [upozilas, setUpozilas] = useState([])
    // const [searchedUpozila, setSearchedUpozila] = useState(null);
    // state 
    const [state, dispatch] = useReducer(shoppingReducer, shopingAddress)
    // console.log(state);
    // toggle selection functionality 
    const getToggle = clicked => toggle.clicked ? setToggle({clicked:''}) :  setToggle({clicked:clicked})
    // division search functionality
    const handleSearchDivision = (event) => {
        const searchValue = event.target.value.toLowerCase()
            if(!isLoading){
                const searchedData = divisions?.filter(division => division?._id.toLowerCase().startsWith(searchValue))
                setSearchedDivisions(()=> searchedData )
            }
     }  

     // district search functionality
     const handleSearchDistrict = async (event)=>{ 
        const searchValue = event.target.value.toLowerCase()
        if(!loading){
            const searchedData = await districts?.filter(district=>district?.district.toLowerCase().startsWith(searchValue))
            setSearchedDsitrict(()=> searchedData)
            console.log(searchedData);
        }
     }
    //  load district name 
     const getDistrict =(name) =>{
        setLoading(true)
        const url = `https://bdapi.p.rapidapi.com/v1.1/division/${name}`
        fetch(url, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': 'fecb1ebb34msh0532c57e8a2deb3p1c8245jsne3742372431c',
                'X-RapidAPI-Host': 'bdapi.p.rapidapi.com'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setDistricts(data?.data)
            console.log(data);
            setLoading(false)
        })
     }
    
    // select division value function 
    const handleDivisionValue = (name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setDivisionName(name)
        getDistrict(name)
    }
    // select district value function 
    const handleDistrictValue = (name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setDistrictName(name)
    }

    return(
        <div className="shoping-address">
            <form action="" method="">
                <div className="shoping-head">
                    <h3>
                        Shoping Address
                    </h3>
                    <button className="btn-copy">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="btn-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                        </svg>
                        Copy billing address
                    </button>
                </div>
                <div className="input-group">
                    <label htmlFor="district">Attention</label>
                    <div>
                        <input type='text' className="inputText"  onBlur={(e)=>dispatch({type:"PERSON",  payload:e.target.value})} placeholder="Enter person" />
                    </div>
                </div>
                {/* division field  */}
                <div className="input-group">
                    <label htmlFor="division">Division/Province/State</label>
                    <div id="division"  onClick={()=>getToggle('division')}  className="countries">
                        <p>{divisionName}</p>
                        <div className="icon-container">
                            <svg className={`icon ${toggle.clicked === 'division'? 'active':''}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`select-container ${toggle.clicked === 'division' ? 'active':''}`}>
                        <input placeholder="Search here" className="search" type="text"  onChange={handleSearchDivision}/>
                        <div className="select-items">
                            <ul className="select">
                                {/* loading message  */}
                                {
                                    isLoading && <span>Searching...</span>
                                }
                                {/* initialize load tag */}
                                {
                                     !isLoading  && searchedDivisions === null && <span>Search Your Country</span>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedDivisions !== null && searchedDivisions.length <= 0 && <span> Oops! No Countries Show</span>
                                }
                                {/* show the searched country */}
                                {
                                    searchedDivisions?.map((dev)=> <li className="option" onClick={()=>handleDivisionValue(dev.division, "DIVISION")} key={dev._id}  >{dev.division}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* district field  */}
                <div className="input-group">
                    <label htmlFor="district">Dsitrict</label>
                    <div id="district"  onClick={()=>getToggle('district')}  className="countries">
                        <p>{districtName}</p>
                        <div className="icon-container">
                            <svg className={`icon ${toggle.clicked === 'district'? 'active':''}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`select-container ${toggle.clicked === 'district' ? 'active':''}`}>
                        <input placeholder="Search here" className="search" type="text"  onChange={handleSearchDistrict}/>
                        <div className="select-items">
                            <ul className="select">
                                {/* loading message  */}
                                {
                                    loading && <span>Searching...</span>
                                }
                                {/* initialize load tag */}
                                {
                                     !loading  && searchedDsitrict === null && <span>Search Your Country</span>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedDsitrict !== null && searchedDsitrict?.length <= 0 && <span> Oops! No Countries Show</span>
                                }
                                {/* show the searched country */}
                                {
                                    searchedDsitrict?.map((dev)=> <li className="option" onClick={()=>handleDistrictValue(dev._id, "DISTRICT")} key={dev._id}  >{dev.district}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Thana field  */}
                <div className="input-group">
                    <label htmlFor="district">Thana/Upazila</label>
                    <div>
                        <input type='text' className="inputText" onBlur={(e)=>dispatch({type:"CITY",  payload:e.target.value})}  placeholder="Type your here" />
                    </div>
                </div>
                {/* Thana field  */}
                <div className="input-group">
                    <label htmlFor="district">Area/Union/Town</label>
                    <div>
                        <input type='text' className="inputText" onBlur={(e)=>dispatch({type:"UNION",  payload:e.target.value})}  placeholder="Type your here" />
                    </div>
                </div>
                {/* zipcode field  */}
                <div className="input-group">
                    <label htmlFor="district">Zipcode</label>
                    <div>
                        <input type='number' onBlur={(e)=>dispatch({type:"ZIPCODE",  payload:e.target.value})} className="inputText"  placeholder="Type your here" />
                    </div>
                </div>
                {/* street address field  */}
                <div className="input-group">
                    <label htmlFor="district">Street Address/Village</label>
                    <div>
                        <input type='text' className="inputText" onBlur={(e)=>dispatch({type:"VILLAGE",  payload:e.target.value})} placeholder="Type your here" />
                    </div>
                </div>
                {/* house field  */}
                <div className="input-group">
                    <label htmlFor="district">House/Suite/apartment no</label>
                    <div>
                        <input type='text' className="inputText" onBlur={(e)=>dispatch({type:"HOUSE_NUMBER",  payload:e.target.value})}  placeholder="Type your here" />
                    </div>
                </div>
                {/* phone field  */}
                <div className="input-group">
                    <label htmlFor="district">Phone</label>
                    <div>
                        <input type='tell' required className="inputText" onBlur={(e)=>dispatch({type:"PHONE",  payload:e.target.value})}  placeholder="Type your here" />
                    </div>
                </div>
                {/* fax field  */}
                <div className="input-group">
                    <label htmlFor="district">Fax</label>
                    <div>
                        <input type='tell' className="inputText" onBlur={(e)=>dispatch({type:"FAX",  payload:e.target.value})}  placeholder="Type your here" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ShopingAddress;