import './HeroCard.css';

type Props = {
    hero: any;
    selectCharacter: (char: any) => void;
  };

const HeroCard = ({hero, selectCharacter}: Props) => {

  return (
    <div className="App_hero_card">
        <img className="App_hero_card_thumbnail" src={`${hero.thumbnail.path}/portrait_medium.${hero.thumbnail.extension}`} alt="" />
        <div className="App_hero_card_infos">
            <h4>{hero.name}</h4>
            <p>{hero.description}</p>
            <button onClick={() => {selectCharacter(hero)}}>
                See details
            </button>
        </div>
    </div>
  );
}

export default HeroCard;