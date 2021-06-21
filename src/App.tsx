import React, {useState, useEffect} from 'react';
import './App.css';
import md5 from 'md5';

import datas from './datas.json';

import AppHeader from './components/header/AppHeader';
import AppBody from './components/body/AppBody';

const App = () => {
  
  const publicKey = "cd11f3d4c0526e9ec4d5473d710950d3";
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const baseUrl = "http://gateway.marvel.com/v1/public/characters";

  const query = `?limit=${100}&offset=${27}&nameStartsWith=${"i"}`;

  const timestamp = new Date().getTime();

  const hash = md5(timestamp + (privateKey ? privateKey : "") + publicKey);

  const auth = `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  const url = `${baseUrl}${query}${auth}`;

  const [data, setData] = useState({});
   
    useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(data => {

        console.log(data);

        if (data.code === "RequestThrottled") {
          //setData(datas.data);
          console.log(datas);
        }
        else {
        // available:
        // data.data.offset;
        // data.data.limit;
        // data.dara.total;
        // data.data.count;
        // data.data.results;
        console.log(data.data);
        setData(data.data);
        }
      });
    }, []);

  return (
    <div className="App">
      <AppHeader />
      <AppBody data={data} /> 
    </div>
  );
}

export default App;
