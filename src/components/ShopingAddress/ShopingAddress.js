import { useContext, useEffect, useReducer,  useState } from "react";
import { ADDRESS_CONTEXT } from "../../App";
import useDivision from "../../hooks/useDivision";
import { billingReducer, shoppingReducer} from "../../state/action";
import { billingAddress, shopingAddress } from "../../state/state";
  
 
const ShopingAddress = () =>{
    const [toggle, setToggle] = useState({clicked:''})
    const [loading, setLoading] = useState(false);
    const {state} =useContext(ADDRESS_CONTEXT)
    //  for division 
    const {divisions, isLoading} =useDivision()
    const [searchedDivisions, setSearchedDivisions] = useState(null);
    // for district 
    const [districts, setDistricts] = useState([])
    const [searchedDsitrict, setSearchedDsitrict] = useState(null);
    //  for upozila 
    const [upozilas, setUpozilas] = useState([])
    const [searchedUpozila, setSearchedUpozila] = useState(null);
    // for union 
    const [unions, setUnions] = useState([])
    const [searchedUnion, setSearchedUnion] = useState(null);
    // for zipcode 
    const [zipcode, setZipcode] = useState([]);
    // state 
    const [shopState, dispatch] = useReducer(shoppingReducer, shopingAddress)

    const [shopAddresses, setShopAddresses] =useState(shopingAddress)
    useEffect(()=>{
        console.log(shopAddresses,"shoppp");
    },[shopAddresses])
    // toggle selection functionality 
    const getToggle = clicked => toggle.clicked ? setToggle({clicked:''}) :  setToggle({clicked:clicked})
    // division search functionality
    const handleSearchDivision = (event) => {
        const searchValue = event.target.value.toLowerCase()
            if(!isLoading){
                const searchedData = divisions?.filter(division => division?.name.toLowerCase().startsWith(searchValue))
                setSearchedDivisions(()=> searchedData )
            }
     }  
     // district search functionality
     const handleSearchDistrict = async (event)=>{ 
        const searchValue = event.target.value.toLowerCase()
        if(!loading){
            const searchedData = await districts?.filter(district=>district?.name.toLowerCase().startsWith(searchValue))
            setSearchedDsitrict(()=> searchedData)
        }
     }
     // upazilas search functionality
     const handleSearchUpazilas = async (event)=>{ 
        const searchValue = event.target.value.toLowerCase()
        if(!loading){
            const searchedData = await upozilas?.filter(upazila=>upazila?.name.toLowerCase().startsWith(searchValue))
            setSearchedUpozila(()=> searchedData)
        }
     }
     // unions search functionality
     const handleSearchUnions = async (event)=>{ 
        const searchValue = event.target.value.toLowerCase()
        if(!loading){
            const searchedData = await unions?.filter(union=>union?.name.toLowerCase().startsWith(searchValue))
            setSearchedUnion(()=> searchedData)
        }
     }
    //  load district name 
     const getDistrict =(id) =>{
        setLoading(true)
        const url = `https://bicycle-pars-tanvir-alam625.onrender.com/bd/districts/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setDistricts(data)
            setLoading(false)
        })
     }
    //  load upazilas name 
     const getUpazilas =(id) =>{
        setLoading(true)
        const url = `https://bicycle-pars-tanvir-alam625.onrender.com/bd/upazilas/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setUpozilas(data)
            setLoading(false)
        })
     }
    
    //  load unions name 
     const getUnions =(id) =>{
        setLoading(true)
        const url = `https://bicycle-pars-tanvir-alam625.onrender.com/bd/unions/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setUnions(data)
            setLoading(false)
        })
     }
    //  load zipcode name 
     const getZipcode =(name) =>{
        setLoading(true)
        const url = `https://bicycle-pars-tanvir-alam625.onrender.com/bd/zipcodes/${name}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setZipcode(data)
            setLoading(false)
            if(data[0]?.postCode){
                dispatch({type:"ZIPCODE", payload:data[0].postCode})
            }
        })
     }
    
    // select division value function 
    const handleDivisionValue = (id, name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setShopAddresses((prev)=>{
            return {...prev, division:name}
        })
        getDistrict(id)
    }
    // select district value function 
    const handleDistrictValue = (id, name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setShopAddresses((prev)=>{
            return {...prev, district:name}
        })
        getUpazilas(id)
    }
    // select upazila value function 
    const handleUpazilaValue = (id, name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setShopAddresses((prev)=>{
            return {...prev, city:name}
        })
        getUnions(id)
        getZipcode(name)
    }
    // select union value function 
    const handleUnionsValue = (name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setShopAddresses((prev)=>{
            return {...prev, union:name}
        })
    }

    return(
        <div className="bill-address">
            <div className="shoping-head">
                    <h3>
                        Shoping Address
                    </h3>
                    <button className="btn-copy"
                    
                    onClick={()=>setShopAddresses(state)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="btn-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                        </svg>
                        Copy billing address
                    </button>
                </div>
            <form action="" method="">
                <div className="input-group">
                    <label htmlFor="district">Attention</label>
                    <div>
                        <input type='text'
                        onChange={(e)=> setShopAddresses((prev)=> {
                            return {...prev, person: e.target.value}
                        })}
                        value={shopAddresses.person} className="inputText"  onBlur={(e)=>dispatch({type:"PERSON",  payload:e.target.value})} placeholder="Enter person" />
                    </div>
                </div>
                {/* division field  */}
                <div className="input-group">
                    <label htmlFor="division">Division/Province/State</label>
                    <div id="division"  onClick={()=>getToggle('division')}  className="countries">
                        <p>{shopAddresses?.division? shopAddresses?.division : "Please Search"}</p>
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
                                    searchedDivisions?.map((dev)=> <li className="option" onClick={()=>handleDivisionValue(dev.id ,dev.name, "DIVISION")} key={dev._id}  >{dev.name}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* district field  */}
                <div className="input-group">
                    <label htmlFor="district">Dsitrict</label>
                    <div id="district"  onClick={()=>getToggle('district')}  className="countries">
                        <p>{shopAddresses?.district? shopAddresses?.district : "Please Search"}</p>
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
                                    searchedDsitrict?.map((dev)=> <li className="option" onClick={()=>handleDistrictValue(dev.id,dev.name, "DISTRICT")} key={dev._id}  >{dev.name}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* upazila field  */}
                <div className="input-group">
                    <label htmlFor="upazila">Thana/Upazila</label>
                    <div id="upazila"  onClick={()=>getToggle('upazila')}  className="countries">
                        <p>{shopAddresses?.city? shopAddresses?.city : "Please Search"}</p>
                        <div className="icon-container">
                            <svg className={`icon ${toggle.clicked === 'upazila'? 'active':''}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`select-container ${toggle.clicked === 'upazila' ? 'active':''}`}>
                        <input placeholder="Search here" className="search" type="text"  onChange={handleSearchUpazilas}/>
                        <div className="select-items">
                            <ul className="select">
                                {/* loading message  */}
                                {
                                    loading && <span>Searching...</span>
                                }
                                {/* initialize load tag */}
                                {
                                     !loading  && searchedUpozila === null && <span>Search Your Country</span>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedUpozila !== null && searchedUpozila?.length <= 0 && <span> Oops! No Countries Show</span>
                                }
                                {/* show the searched country */}
                                {
                                    searchedUpozila?.map((dev)=> <li className="option" onClick={()=>handleUpazilaValue(dev.id, dev.name, "CITY")} key={dev._id}  >{dev.name}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* union field  */}
                <div className="input-group">
                    <label htmlFor="union">Area/Union/Town</label>
                    <div id="union"  onClick={()=>getToggle('union')}  className="countries">
                        <p>{shopAddresses?.union? shopAddresses?.union : "Please Search"}</p>
                        <div className="icon-container">
                            <svg className={`icon ${toggle.clicked === 'union'? 'active':''}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`select-container ${toggle.clicked === 'union' ? 'active':''}`}>
                        <input placeholder="Search here" className="search" type="text"  onChange={handleSearchUnions}/>
                        <div className="select-items">
                            <ul className="select">
                                {/* loading message  */}
                                {
                                    loading && <span>Searching...</span>
                                }
                                {/* initialize load tag */}
                                {
                                     !loading  && searchedUnion === null && <span>Search Your Country</span>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedUnion !== null && searchedUnion?.length <= 0 && <span> Oops! No Countries Show</span>
                                }
                                {/* show the searched country */}
                                {
                                    searchedUnion?.map((dev)=> <li className="option" onClick={()=>handleUnionsValue(dev.name, "UNION")} key={dev._id}  >{dev.name}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
               
                {/* zipcode field  */}
                <div className="input-group">
                    <label htmlFor="district">Zipcode</label>
                    <div>
                       {
                            !zipcode[0]?.postCode &&  <input type='number'
                            value={shopAddresses.zipcode}
                            onChange={(e)=> setShopAddresses((prev)=> {
                               return {...prev, zipcode: e.target.value}
                           })}
                            onBlur={(e)=>dispatch({type:"ZIPCODE",  payload: e.target.value})} className="inputText"  placeholder="Type your here" />
                       }
                        {
                            zipcode[0]?.postCode && <input type='number'  value={zipcode[0]?.postCode} className="inputText" readOnly />
                        }
                    </div>
                </div>
                {/* street address field  */}
                <div className="input-group">
                    <label htmlFor="district">Street Address/Village</label>
                    <div>
                        <input type='text' className="inputText"
                         value={shopAddresses.village}
                         onChange={(e)=> setShopAddresses((prev)=> {
                            return {...prev, village: e.target.value}
                        })}
                        onBlur={(e)=>dispatch({type:"VILLAGE",  payload:e.target.value})} placeholder="Type your here" />
                    </div>
                </div>
                {/* house field  */}
                <div className="input-group">
                    <label htmlFor="district">House/Suite/apartment no</label>
                    <div>
                        <input type='text' className="inputText"
                         value={shopAddresses.houseNumber}
                         onChange={(e)=> setShopAddresses((prev)=> {
                            return {...prev, houseNumber: e.target.value}
                        })}
                        onBlur={(e)=>dispatch({type:"HOUSE_NUMBER",  payload:e.target.value})}
                        placeholder="Type your here" />
                    </div>
                </div>
                {/* phone field  */}
                <div className="input-group">
                    <label htmlFor="district">Phone</label>
                    <div>
                        <input type='tell'  className="inputText"
                         value={shopAddresses.phone}
                         onChange={(e)=> setShopAddresses((prev)=> {
                            return {...prev, phone: e.target.value}
                        })}
                        onBlur={(e)=>dispatch({type:"PHONE",  payload:e.target.value})}
                        placeholder="Type your here" />
                    </div>
                </div>
                {/* fax field  */}
                <div className="input-group">
                    <label htmlFor="district">Fax</label>
                    <div>
                        <input type='tell' className="inputText" 
                         value={shopAddresses.fax}
                         onChange={(e)=> setShopAddresses((prev)=> {
                            return {...prev, fax: e.target.value}
                        })}
                        onBlur={(e)=>dispatch({type:"FAX",  payload:e.target.value})}  
                        placeholder="Type your here" />
                    </div>
                </div>
            </form> 
        </div>
    )
    
}

export default ShopingAddress;