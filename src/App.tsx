import React, {useState, useEffect} from 'react';
import './App.css';
import md5 from 'md5';

import AppHeader from './components/header/AppHeader';
import AppBody from './components/body/AppBody';
import PrivateKeyModal from './components/PrivateKeyModal';

//import tempData from './datas.json';

const App = () => {
  
  const publicKey = "cd11f3d4c0526e9ec4d5473d710950d3";
  // const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const[privateKey, setPrivateKey] = useState<string | null>(null)

  const baseUrl = "http://gateway.marvel.com/v1/public/characters";

  //const query = `?limit=${100}&offset=${0}`;

  // keep a list of characters / ids / description, and thumbnail? Allowing for a research on names
  const [allCharacterList, setAllCharacterList] = useState<any[]>([]);
  // refined list when there's a name-based research
  const [refinedCharacterList, setRefinedCharacterList] = useState<any[]>([]);

  // Unique character for the unique character page
  const [uniqueCharacter, setUniqueCharacter] = useState<any>();

  // Loader and pagination datas
  const [bodyLoading, setBodyLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordPrivateKey = (key: string) => {
    setPrivateKey(key);
  }

  //const fetchAllCharactersCallBack = useCallback(fetchAllCharacters, [])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchAllCharacters = (
      count = 0,
      total = 0,
      response: any[] = []
    ): any => {
      const timestamp = new Date().getTime();
      const hash = md5(timestamp + (privateKey ? privateKey : "") + publicKey);
      const auth = `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
      return fetch(`${baseUrl}?limit=100&offset=${count}${auth}`) // Append the page number to the base URL
        .then(response => response.json())
        .then(data => {
          total = data?.data?.total;
          count += data?.data?.count;
          if (data?.data?.results) {
            data.data.results.forEach((char: any) => {
              const charObject = {
                id: char.id,
                name: char.name,
                description: char.description,
                thumbnail: char.thumbnail
              }
                response.push(charObject);
            })
          };
          if (count < total) {
            return fetchAllCharacters( count, total, response);
          }
          return response;
        });
    }

    fetchAllCharacters()
    .then((response: any) => {
      console.log(response);
      setAllCharacterList(response);
    });
  }, [privateKey]);

//////////////////////////////////////
//useEffect(() => {
//  let results: any[] = [];
//  tempData.data.results.forEach((char: any) => {
//    const charObject = {
//      id: char.id,
//      name: char.name,
//      description: char.description,
//      thumbnail: char.thumbnail
//    }
//    results.push(charObject);
//  });
//  setAllCharacterList(results);
//}, []);
//////////////////////////////////

  const filterCharacters = (research: string) => {
    if (research.length > 2) {
      const newCharacterArray = allCharacterList.filter((character => character.name.toLowerCase().includes(research.toLowerCase())));
      setRefinedCharacterList(newCharacterArray);
    } else {
      setRefinedCharacterList([]);
    }
  }

  const selectCharacter = (characterObject: any) => {
    setBodyLoading(true);
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + (privateKey ? privateKey : "") + publicKey);
    const auth = `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    fetch(`${baseUrl}/${characterObject.id}?${auth}`)
      .then(response => response.json())
      .then(data => {
        const char = data.data.results[0];
        setUniqueCharacter(char);
        setBodyLoading(false);
      })

  }

  const removeSelectedCharacter = () => {
    setUniqueCharacter(null);
  }

  const changeCurrentPage = (numb: number) => {
    const currentList = refinedCharacterList.length > 0 ? refinedCharacterList : allCharacterList;
    let nextPage = currentPage + numb;
    console.log("nextPage: " + nextPage);
    if (nextPage <= 1) nextPage = 1;
    console.log("nextPage: " + nextPage);
    if (nextPage >= Math.ceil(currentList.length / 4)) nextPage = Math.ceil(currentList.length / 4);
    console.log("nextPage: " + nextPage);
    setCurrentPage(nextPage);
  }

  return (
    <div className="App">
      {
        privateKey
        ? <>
            <AppHeader filterCharacters={filterCharacters}/>
            <AppBody
              selectCharacter={selectCharacter}
              removeSelectedCharacter={removeSelectedCharacter}
              uniqueCharacter={uniqueCharacter}
              loading={allCharacterList.length === 0 || bodyLoading}
              characterList={refinedCharacterList.length > 0 ? refinedCharacterList : allCharacterList}
              currentPage={currentPage}
              setPage={changeCurrentPage}
            />
        </>
        : <PrivateKeyModal recordPrivateKey={recordPrivateKey} />
      }
 
    </div>
  );
}

export default App;
