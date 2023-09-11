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
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  buyVocals: boolean;
  winner: boolean;
  loseTurn: boolean;
  lettersData: string[]
}

export const useActionsPlayer = ({ data, points, play, inputValue, oration, setPlay, buyVocals, winner, loseTurn, lettersData }: Props) => {
  const dispatch = useDispatch();

  const [player, setPlayer] = useState<Score | null>(null);

  const loseTurnPlayer = useCallback(() => {

    if (player && loseTurn) {
      dispatch(add_user({ ...player, active: false }));

      const playerActual = data.find(({ id }) => id === player.id + 1);
      const firstPlay = data.find(({ id }) => id === 1);

      if (playerActual) {
        setPlayer({ ...playerActual, active: true });
        dispatch(add_user({ ...playerActual, active: true }));

      } else if (firstPlay) {
        setPlayer({ ...firstPlay, active: true });
        dispatch(add_user({ ...firstPlay, active: true }));
      }

    }

  }
    , [dispatch, player, loseTurn, data]);

  const letterNotFoubnd = useCallback(() => {

    if (player) {
      dispatch(add_user({ ...player, active: false }));

      const playerActual = data.find(({ id }) => id === player.id + 1);
      const firstPlay = data.find(({ id }) => id === 1);

      if (playerActual) {
        setPlayer({ ...playerActual, active: true });
        dispatch(add_user({ ...playerActual, active: true }));

      } else if (firstPlay) {
        setPlayer({ ...firstPlay, active: true });
        dispatch(add_user({ ...firstPlay, active: true }));
      }

    }

  }
    , [dispatch, player, data]);

  const updatePoints = useCallback((points: number) => {

    if (player && inputValue) {
      const indice = oration.indexOf(inputValue);
      const vocals = ["A", "E", "I", "O", "U"];

      if (!lettersData.includes(inputValue)) {
        if (buyVocals && indice !== -1 && vocals.includes(inputValue)) {
          setPlayer({ ...player, points: player?.points - 250 });
          dispatch(add_letter(inputValue));
          dispatch(add_user({ ...player, points: player?.points - 250 }));

        }

        if (!buyVocals && points > 0 && indice !== -1) {
          setPlayer({ ...player, points: player?.points + points });
          dispatch(add_letter(inputValue));
          dispatch(add_user({ ...player, points: player?.points + points }));
        }
      } else {
        letterNotFoubnd();
      }



      setPlay(false);

    }

  }
    , [player, dispatch, oration, inputValue, setPlay, buyVocals, lettersData]);

  const winnerPlayer = useCallback(() => {

    if (player) {
      setPlayer({ ...player, total: player?.total + player.points, points: 0 });
      dispatch(add_user({ ...player, total: player?.total + player.points, points: 0 }));

      data.map((p) => {
        dispatch(add_user({ ...p, points: 0 }));

      })
    }

  }
    , [dispatch, player]);



  useEffect(() => {
    let active = true;

    if (active && loseTurn) {
      loseTurnPlayer();
    }

    return () => {
      active = false;
    }
  }, [loseTurn])


  useEffect(() => {
    let active = true;

    if (active && inputValue && play) {

      const indice = oration.indexOf(inputValue);

      if (points > 0 && indice === -1) letterNotFoubnd();

    }

    return () => {
      active = false;
    }
  }, [points, play, inputValue, oration])


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
  }, [points, player, play])

  useEffect(() => {
    let active = true;

    if (active && winner) {
      winnerPlayer();
    }

    return () => {
      active = false
    }
  }, [winner, winnerPlayer])



}
