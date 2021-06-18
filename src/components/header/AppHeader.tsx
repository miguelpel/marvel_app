import React from 'react';
import marvelLogo from '../../images/Marvel_Logo.png';
import magnifyingGlassLogo from '../../images/49116.png';
import './AppHeader.css';

const AppHeader = () => {
  return (
    <div className="App-header">
        <img src={marvelLogo} alt="logo" className="App-header_logo" />
        <div className="App-header_search_field">
            <img src={magnifyingGlassLogo} alt="logo2" className="App-header_magnifying_glass" />
            <input className="App-header_input"/>
        </div>

    </div>
  );
}

export default AppHeader;