import { Board } from '../components/Board';
// import Roulette from '../components/Roulette';
// import { rouletteData } from '../data/roulette.ts';
export const Home = () => {
  const oration = 'El abuelo es sabio y sabe lo que hace';

  return (
    <div className='home__screen'>
      <Board oration={oration} />;{/* <Roulette data={rouletteData} /> */}
    </div>
  );
};
