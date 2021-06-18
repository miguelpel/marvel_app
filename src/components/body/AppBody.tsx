
import './AppBody.css';

import HeroCard from './HeroCard';

type Props = {
    data: any | undefined;
  };

const AppBody = ({data}: Props) => {

    const heroes = data?.results;

  return (
    <div className="App_body">
        {heroes && heroes.map((hero: any, index: number) => {
            return <HeroCard hero={hero} key={index}/>
        })}
    </div>
  );
}

export default AppBody;
