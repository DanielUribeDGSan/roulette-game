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
import { TextFieldComponent } from '../components/utils/TextField.tsx';

interface State {
  users: { data: Score[] };
}

export const Home = () => {
  const dispatch = useDispatch();

  const { data: userData }: { data: Score[] } = useSelector(
    (state: State) => state.users
  );

  const [open, setOpen] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [buyVocals, setBuyVocals] = useState(false);
  const [points, setPoints] = useState(0);
  const [play, setPlay] = useState(false);

  const oration = 'Amores, por un placer mil dolores';

  useShowAlerts({
    points: points,
    play: play,
    inputValue: inputValue,
    oration: oration.toUpperCase(),
    setPlay: setPlay,
    setPoints: setPoints,
  });

  useActionsPlayer({
    data: userData,
    points: points,
    play: play,
    inputValue: inputValue,
    oration: oration.toUpperCase(),
    setInputValue: setInputValue,
    setPlay: setPlay,
  });

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  return (
    <div className='home__screen'>
      <ShowUsers data={userData} />
      <Board oration={oration.toUpperCase()} />
      <div className='modals__content d-flex gap-5'>
        <Modal
          open={openLetter}
          setOpen={setOpenLetter}
          textButton='Comprar letra'
          vocals={true}
          setBuyVocals={setBuyVocals}
          setInputValue={setInputValue}
          setPlay={setPlay}
          points={points}
        >
          <TextFieldComponent
            setOpenLetter={setOpenLetter}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setPlay={setPlay}
            buyVocals={buyVocals}
          />
        </Modal>
        <Modal
          open={open}
          setOpen={setOpen}
          textButton='Girar la ruleta'
          setBuyVocals={setBuyVocals}
          setInputValue={setInputValue}
          setPlay={setPlay}
          points={points}
        >
          <Roulette
            data={rouletteData}
            setOpen={setOpen}
            setPoints={setPoints}
            setOpenLetter={setOpenLetter}
            setPlay={setPlay}
          />
        </Modal>
      </div>

      {/* <RegisterPlayers /> */}
      {/* <DeletePlayers /> */}
    </div>
  );
};
