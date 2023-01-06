
import './App.css';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import useCountries from './hooks/useCountries';

function App() {
//   useEffect(()=>{
// const options = {
//   method: 'GET',
//   url: 'https://bdapi.p.rapidapi.com/v1.1/divisions',
//   headers: {
//     'X-RapidAPI-Key': 'fecb1ebb34msh0532c57e8a2deb3p1c8245jsne3742372431c',
//     'X-RapidAPI-Host': 'bdapi.p.rapidapi.com'
//   }
// };
// fetch(options.url,{
//   method: options.method,
//   headers: options.headers
// })
// .then(res=>res.json())
// .then(data => console.log(data))
//   },[])
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
