import React from 'react';
import logo from './logo.svg';
import './App.css';
import md5 from 'md5';

function App() {

  //var md5 = require('md5');
 
  //console.log(md5('message'));

  //const charUrl = "http://gateway.marvel.com/v1/public/characters?"
  //const ts = Date.now();
  
  //const apikey = "8fb61ed0d8ae4cc76943c8d2b8e2ed9c";

  const id = "pellet360442765";
  
  const publicKey = "58a0be4cb4f2f4117a83663b6b4b79dc";
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const baseUrl = "http://gateway.marvel.com/v1/public/characters";

  const query = `?limit=${100}&offset=${27}&nameStartsWith=${"i"}`;

  const timestamp = new Date().getTime();

  const hash = md5(timestamp + (privateKey ? privateKey : "") + publicKey);

  const auth = `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  const url = `${baseUrl}${query}${auth}`;


  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello?
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
