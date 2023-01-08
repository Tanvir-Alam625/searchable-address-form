import { useContext,  useState } from "react";
import { ADDRESS_CONTEXT } from "../../App";
import useDivision from "../../hooks/useDivision";
  
 
const BillingAddress = () =>{
    const [toggle, setToggle] = useState({clicked:''})
    const {state, dispatch}=useContext(ADDRESS_CONTEXT)
    const [loading, setLoading] = useState(false);
    const [billingAdd, setBillingAdd] = useState(state);
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
        setBillingAdd(prev=>{
            return { ...prev, division:name }
        })
        getDistrict(id)
        console.log(state);
    }
    // select district value function 
    const handleDistrictValue = (id, name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setBillingAdd(prev=>{
            return { ...prev, district:name }
        })
        getUpazilas(id)
    }
    // select upazila value function 
    const handleUpazilaValue = (id, name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setBillingAdd(prev=>{
            return { ...prev, city:name }
        })
        getUnions(id)
        getZipcode(name)
    }
    // select union value function 
    const handleUnionsValue = (name, type) =>{
        dispatch({type:type,  payload:name});
        setToggle({clicked:''})
        setBillingAdd(prev=>{
            return { ...prev, union:name }
        })
    }

    return(
        <div className="bill-address">
            <form action="" method="">
                <h3>
                    Billing Address
                </h3>
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
                        <p>{billingAdd?.division? billingAdd?.division : "Please Search"}</p>
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
                                     !isLoading  && searchedDivisions === null && <li className="option">Search for select</li>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedDivisions !== null && searchedDivisions.length <= 0 && <span> Oops! No Divisions Show</span>
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
                        <p>{billingAdd?.district? billingAdd?.district : "Please Search"}</p>
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
                                     !loading  && searchedDsitrict === null && <li className="option">Search for select</li>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedDsitrict !== null && searchedDsitrict?.length <= 0 && <span> Oops! No Districts Show</span>
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
                    <label htmlFor="upazila">City/Thana/Upazila</label>
                    <div id="upazila"  onClick={()=>getToggle('upazila')}  className="countries">
                        <p>{billingAdd?.city? billingAdd?.city : "Please Search"}</p>
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
                                     !loading  && searchedUpozila === null && <li className="option">Search for select</li>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedUpozila !== null && searchedUpozila?.length <= 0 && <span> Oops! No upazilas Show</span>
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
                        <p>{billingAdd?.union? billingAdd?.union : "Please Search"}</p>
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
                                     !loading  && searchedUnion === null && <li className="option">Search for select</li>
                                }
                                {/* no data show tag  */}
                                {
                                    !isLoading && searchedUnion !== null && searchedUnion?.length <= 0 && <span> Oops! No Unions Show</span>
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
                        !zipcode[0]?.postCode &&  <input type='number' onBlur={(e)=>dispatch({type:"ZIPCODE",  payload: e.target.value})} className="inputText"  placeholder="Type your here" />
                       }
                        {
                         zipcode[0]?.postCode &&  <input type='number'  value={zipcode[0]?.postCode} className="inputText" readOnly />
                        }
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

export default BillingAddress;