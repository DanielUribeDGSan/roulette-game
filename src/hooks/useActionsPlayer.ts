import { useCallback, useEffect, useState } from 'react';
import { Score } from '../interfaces/sccore';
import { useDispatch } from 'react-redux';
import { add_user } from '../redux/features/users-slice';
import { add_letter } from '../redux/features/letters-slice';

interface Props {
  data: Score[];
  points: number;
  play: boolean;
  inputValue: string;
  oration: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useActionsPlayer = ({ data, points, play, inputValue, oration, setInputValue, setPlay }: Props) => {
  const dispatch = useDispatch();


  const vocals = ["A", "E", "I", "O", "U"];

  const [player, setPlayer] = useState<Score | null>(null);

  const updatePoints = useCallback((points: number) => {

    if (player && inputValue) {

      const indice = oration.indexOf(inputValue);

      if (points > 0 && indice !== -1) {
        setPlayer({ ...player, points: player?.points + points });
        dispatch(add_letter(inputValue));
        dispatch(add_user({ ...player, points: player?.points + points }));
      }

      setPlay(false);
      setInputValue('');
    }

  }
    , [player, dispatch, oration, inputValue, setInputValue, setPlay]);


  useEffect(() => {
    let active = true;


    if (active && data.length > 0) {

      const playerActual = data.find(({ active }) => active === true);

      if (playerActual?.active) {

        if (!player || player?.id !== playerActual?.id) {
          setPlayer(playerActual);
        }
      }
    }

    return () => {
      active = false
    }
  }, [data, player])

  useEffect(() => {
    let active = true;

    if (active && player && play) {
      updatePoints(points || -1);
    }

    return () => {
      active = false
    }
  }, [points, player, updatePoints, play])


}
