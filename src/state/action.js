  // reducer function 
  export const billingReducer = (state, action ) =>{
  switch (action.type) {
    case "PERSON":
      return {
        ...state,
        person: action.payload
      }
    case "DIVISION":
      return {
        ...state,
        division: action.payload
      }
    case "DISTRICT":
      return {
        ...state,
        district: action.payload
      }
    case "CITY":
      return {
        ...state,
        city: action.payload
      }
    case "UNION":
      return {
        ...state,
        union: action.payload
      }
    case "ZIPCODE":
      return {
        ...state,
        zipcode: action.payload
      }
    case "VILLAGE":
      return {
        ...state,
        village: action.payload
      }
    case "HOUSE_NUMBER":
      return {
        ...state,
        houseNumber: action.payload
      }
    case "PHONE":
      return {
        ...state,
        phone: action.payload
      }
    case "FAX":
      return {
        ...state,
        fax: action.payload
      }
    default:
        return state
  }
}
export const shoppingReducer = (state, action ) =>{
  switch (action.type) {
    case "PERSON":
      return {
        ...state,
        person: action.payload
      }
    case "DIVISION":
      return {
        ...state,
        division: action.payload
      }
    case "DISTRICT":
      return {
        ...state,
        district: action.payload
      }
    case "CITY":
      return {
        ...state,
        city: action.payload
      }
    case "UNION":
      return {
        ...state,
        union: action.payload
      }
    case "ZIPCODE":
      return {
        ...state,
        zipcode: action.payload
      }
    case "VILLAGE":
      return {
        ...state,
        village: action.payload
      }
    case "HOUSE_NUMBER":
      return {
        ...state,
        houseNumber: action.payload
      }
    case "PHONE":
      return {
        ...state,
        phone: action.payload
      }
    case "FAX":
      return {
        ...state,
        fax: action.payload
      }
    default:
        return state
  }
}