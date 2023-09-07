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
import useShowAlerts from '../hooks/useShowAlerts.ts';
import { useActionsPlayer } from '../hooks/useActionsPlayer.ts';

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

  const oration = 'Amores, por un placer mil dolores';

  useShowAlerts({
    points: points,
    play: play,
    setPlay: setPlay,
  });

  useActionsPlayer({
    data: userData,
    points: points,
    play: play,
  });

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  return (
    <div className='home__screen'>
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
