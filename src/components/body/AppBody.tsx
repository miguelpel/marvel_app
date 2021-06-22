
import { useState, useEffect } from 'react';
import './AppBody.css';

import HeroCard from './HeroCard';
import BodyLoader from './BodyLoader';
import UniqueCharacterCard from './UniqueCharacterCard';

type Props = {
  loading: boolean;
  characterList: any[];
  currentPage: number;
  setPage: (number: number) => void;
  uniqueCharacter: any;
  selectCharacter: (char: any) => void;
  removeSelectedCharacter: () => void;
  };

const AppBody = ({loading, characterList, currentPage, setPage, selectCharacter, uniqueCharacter, removeSelectedCharacter}: Props) => {

    const currentCharIndex = (currentPage - 1) * 4;
    const currentPageChars = characterList.slice(currentCharIndex, currentCharIndex + 4);

  return (
    <div className="App_body">
      {
        loading
        ? <BodyLoader />
        : uniqueCharacter ? <UniqueCharacterCard hero={uniqueCharacter} removeSelectedCharacter={removeSelectedCharacter}/> : characterList && currentPageChars.map((char, index) => <HeroCard hero={char} key={index} selectCharacter={selectCharacter}/>)
      }
      {
        characterList.length > 4 && !uniqueCharacter && <div className="pages_controller">
                                                          <button onClick={() => setPage(-1)}>{'<'}</button>
                                                          <button onClick={() => setPage(1)}>{'>'}</button>
                                                        </div>
      }
    </div>
  );
}

export default AppBody;
