import BillingAddress from "./BillingAddress/BillingAddress";
import ShopingAddress from "./ShopingAddress/ShopingAddress";

 const Form =({country})=>{
    return (
        <div className="shopping-address-container">
            {/* billing address  compo.  */}
            <BillingAddress country={country} />
            {/* shopping  address compo.   */}
            <ShopingAddress country={country} />
        </div>
    );
}
export default Form;