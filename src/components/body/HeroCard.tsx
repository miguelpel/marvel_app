import './HeroCard.css';

type Props = {
    hero: any;
  };

const HeroCard = ({hero}: Props) => {

  return (
    <div className="App_hero_card">
        <img className="App_hero_card_thumbnail" src={`${hero.thumbnail.path}/portrait_medium.jpg`} alt="" />
        <div className="App_hero_card_infos">
            <h4>{hero.name}</h4>
            <p>{hero.description}</p>
            <button>See details</button>
        </div>
    </div>
  );
}

export default HeroCard;