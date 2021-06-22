import React, {useRef} from 'react';
import marvelLogo from '../../images/Marvel_Logo.png';
import magnifyingGlassLogo from '../../images/49116.png';
import './AppHeader.css';

type Props = {
  filterCharacters: (chars: string) => void;
  };

const AppHeader = ({filterCharacters}: Props) => {

  const textInput = useRef(null);

  const launchResearch = () => {
    console.log("launching Research")
    const currentInput: any = textInput?.current ?  textInput?.current : null;
    if (currentInput !== null) {
      const value = currentInput.value;
      filterCharacters(value);
    }
  }

  const onInputChange = () => {
    const currentInput: any = textInput?.current ?  textInput?.current : null;
    if (currentInput !== null) {
      const value = currentInput.value;
      launchResearch();
    }
  }

  return (
    <div className="App-header">
        <img src={marvelLogo} alt="logo" className="App-header_logo" />
        <div className="App-header_search_field">
            <img src={magnifyingGlassLogo} alt="logo2" className="App-header_magnifying_glass" onClick={() => launchResearch()}/>
            <input type="text" ref={textInput} className="App-header_input" onChange={onInputChange}/>
        </div>

    </div>
  );
}

export default AppHeader;