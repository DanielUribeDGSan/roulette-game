import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { add_user } from '../redux/features/users-slice';
import { Score } from '../interfaces/sccore';

export const RegisterPlayers = () => {
  const dispatch = useDispatch();

  const players: Score[] = useMemo(
    () => [
      {
        id: 1,
        position: 1,
        user: 'Equipo rojo',
        points: 0,
        total: 0,
        active: true,
        image:
          'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      },
      {
        id: 2,
        position: 2,
        user: 'Equipo azul',
        points: 0,
        total: 0,
        active: false,
        image:
          'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
      },
      {
        id: 3,
        position: 3,
        user: 'Equipo amarillo',
        points: 0,
        total: 0,
        active: false,
        image: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      },
      {
        id: 4,
        position: 4,
        user: 'Equipo verde',
        points: 0,
        total: 0,
        active: false,
        image:
          'https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png',
      },
    ],
    []
  );

  useEffect(() => {
    players.forEach((player) => {
      dispatch(add_user(player));
    });
  }, [dispatch, players]);

  return <></>;
};
