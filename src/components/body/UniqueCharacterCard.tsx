import React from 'react';


type Props = {
    hero: any;
    removeSelectedCharacter: () => any;
};
    
const UniqueCharacterCard = ({hero, removeSelectedCharacter}: Props) => {

    console.log("hero:")
    console.log(hero);

    return (
        <div className="App_hero_card">
            <span onClick={() => {removeSelectedCharacter()}}>Back To results</span>
            <img className="App_hero_card_thumbnail" src={`${hero.thumbnail.path}/portrait_medium.${hero.thumbnail.extension}`} alt="" />
            <div className="App_hero_card_infos">
                <h4>{hero.name}</h4>
                <p>{hero.description}</p>
            </div>
        </div>
    );
}
    
export default UniqueCharacterCard;