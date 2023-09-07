import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../components/Board';
import { Modal } from '../components/utils/Modal';
import Roulette from '../components/Roulette';
import { rouletteData } from '../data/roulette.ts';

import { useDispatch } from 'react-redux';
import { get_users } from '../redux/features/users-slice.ts';

import { ShowUsers } from '../components/ShowUsers.tsx';
import { Score } from '../interfaces/sccore.ts';
import { ShowAlertsPints } from '../components/ShowAlertsPints.tsx';

interface State {
  users: { data: Score[] };
}

export const Home = () => {
  const dispatch = useDispatch();

  const { data: userData }: { data: Score[] } = useSelector(
    (state: State) => state.users
  );

  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [play, setPlay] = useState(false);
  const oration = 'El abuelo es sabio y sabe lo que hace, como siempre';

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  return (
    <div className='home__screen'>
      <ShowAlertsPints points={points} play={play} setPlay={setPlay} />
      <ShowUsers data={userData} />
      <Board oration={oration} />
      <Modal open={open} setOpen={setOpen}>
        <Roulette
          data={rouletteData}
          setOpen={setOpen}
          setPoints={setPoints}
          setPlay={setPlay}
        />
      </Modal>
      {/* <RegisterPlayers /> */}
      {/* <DeletePlayers /> */}
    </div>
  );
};
