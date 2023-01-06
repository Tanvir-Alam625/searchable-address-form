import { useRef, useState } from "react";
import SelectOption from "./SelectOption";

const BillingAddress = ({country}) =>{
    const countryRef = useRef();
    const placeholderName = 'Please Search';
    const [toggle, setToggle] = useState({clicked:''})
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
    return(
        <div className="bill-address">
            <form action="" method="">
                <h3>
                    Billing Address
                </h3>
                <h4>Attention</h4>
                <div className="input-group">
                    <div ref={countryRef} className="countries">
                       {address.country}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default BillingAddress;