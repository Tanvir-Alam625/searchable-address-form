
import './App.css';
import { createContext, useEffect, useReducer, useState } from 'react';
import Form from './components/Form';
import { billingReducer } from './state/action';
import { billingAddress } from './state/state';
export const ADDRESS_CONTEXT =  createContext()

function App() {
  const [state, dispatch] = useReducer(billingReducer, billingAddress)
  const value ={state,dispatch}
    return (
      <ADDRESS_CONTEXT.Provider value={value} >
        <div>
          <Form />
        </div>
      </ADDRESS_CONTEXT.Provider>
    );
}

export default App;
