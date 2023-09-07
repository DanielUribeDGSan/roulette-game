import { useCallback, useEffect, useState } from 'react';
import { Score } from '../interfaces/sccore';
import { useDispatch } from 'react-redux';
import { add_user } from '../redux/features/users-slice';

interface Props {
  data: Score[];
  points: number;
  play: boolean;
}

export const useActionsPlayer = ({ data, points, play }: Props) => {
  const dispatch = useDispatch();

  const [player, setPlayer] = useState<Score | null>(null);

  const updatePoints = useCallback((points: number) => {

    if (player) {
      if (points < 0) {
        setPlayer({ ...player, points: 0 });
        dispatch(add_user({ ...player, points: 0 }));
      } else {
        setPlayer({ ...player, points: player?.points + points });
        dispatch(add_user({ ...player, points: player?.points + points }));
      }
    }

  }
    , [player, dispatch]);


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
