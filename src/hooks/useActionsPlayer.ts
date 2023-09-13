import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Score } from '../interfaces/sccore';
import { useDispatch } from 'react-redux';
import { add_user } from '../redux/features/users-slice';
import { add_letter } from '../redux/features/letters-slice';
import Backgroud from '../assets/images/background/background.jpeg';

interface Props {
  data: Score[];
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  oration: string;
  buyVocals: boolean;
  setBuyVocals: React.Dispatch<React.SetStateAction<boolean>>;
  winner: boolean;
  setWinner: React.Dispatch<React.SetStateAction<boolean>>;
  loseTurn: boolean;
  setLoseTurn: React.Dispatch<React.SetStateAction<boolean>>;
  lettersData: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const useActionsPlayer = ({ data, points, setPoints, play, inputValue, oration, buyVocals, setBuyVocals, winner, setWinner, loseTurn, setLoseTurn, lettersData, setInputValue, setPlay }: Props) => {
  const dispatch = useDispatch();

  const [player, setPlayer] = useState<Score | null>(null);

  const letterNotFoubndBuy = useCallback((playerNow: Score) => {
    if (playerNow) {
      dispatch(add_user({ ...playerNow, active: false }));

      const playerActual = data.find(({ id }) => id === playerNow.id + 1);
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
    , [dispatch, data]);

  const loseTurnPlayer = useCallback(() => {

    if (player && loseTurn) {
      letterNotFoubndBuy(player);
      Swal.fire({
        title: 'Ooops',
        text: `Pierdes turno`,
        width: 700,
        padding: '3em',
        color: '#716add',
        background: `#fff url('${Backgroud}')`,
        customClass: 'alert-points',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false
      });
      setLoseTurn(false);
      setPoints(0);
      setPlay(false);
    }
  }
    , [dispatch, player, loseTurn, data]);

  const letterNotFoubnd = useCallback(() => {

    if (player && inputValue) {
      dispatch(add_user({ ...player, active: false }));

      const playerActual = data.find(({ id }) => id === player.id + 1);
      const firstPlay = data.find(({ id }) => id === 1);
      const indice = oration.indexOf(inputValue);

      if (playerActual) {
        setPlayer({ ...playerActual, active: true });
        dispatch(add_user({ ...playerActual, active: true }));

      } else if (firstPlay) {
        setPlayer({ ...firstPlay, active: true });
        dispatch(add_user({ ...firstPlay, active: true }));
      }

      if (indice === -1 && !lettersData.includes(inputValue)) {
        Swal.fire({
          title: 'Letra no encontrada',
          text: `Esa letra no existe en la oración`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false

        });
      } else {
        Swal.fire({
          title: 'Letra duplicada',
          text: `Esa letra ya se había dicho`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false

        });
      }

      setInputValue('');
      setPlay(false);

    }
  }
    , [dispatch, player, data, inputValue, lettersData, oration]);


  const updatePoints = useCallback((points: number) => {

    if (player && inputValue) {
      const indice = oration.indexOf(inputValue);
      const vocals = ["A", "E", "I", "O", "U"];



      if (!lettersData.includes(inputValue) && !buyVocals && points > 0 && indice !== -1) {
        setPlayer({ ...player, points: player?.points + points });
        dispatch(add_letter(inputValue));
        dispatch(add_user({ ...player, points: player?.points + points }));
        Swal.fire({
          title: 'Has ganado',
          text: `${points}  puntos`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false
        });
        setPoints(0);
        setInputValue('');
        setPlay(false);

      }


      if (buyVocals && indice !== -1 && !lettersData.includes(inputValue)) {
        setPlayer({ ...player, points: player?.points - 250 });
        dispatch(add_letter(inputValue));
        dispatch(add_user({ ...player, points: player?.points - 250 }));

        Swal.fire({
          title: 'Letra comprada',
          text: `Has comprado la vocal: ${inputValue} `,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false
        });
        setBuyVocals(false);
        setPoints(0);
        setPlay(false);
        setInputValue('');

      }


      if (buyVocals && indice !== -1 && lettersData.includes(inputValue)) {
        const playerNow = { ...player, points: player?.points - 250 };
        setPlayer(playerNow);
        dispatch(add_user(playerNow));

        letterNotFoubndBuy(playerNow);
        Swal.fire({
          title: 'Letra duplicada',
          text: `Esa letra ya se había dicho`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false

        });
        setBuyVocals(false);
        setPoints(0);
        setInputValue('');
        setPlay(false);
      }

      if (!vocals.includes(inputValue) && lettersData.includes(inputValue) && indice !== -1) {

        Swal.fire({
          title: 'Letra duplicada',
          text: `Esa letra ya se había dicho`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false

        });
        letterNotFoubnd();
        setPoints(0);
        setInputValue('');
        setPlay(false);
      }

      if (!vocals.includes(inputValue) && !lettersData.includes(inputValue) && indice === -1) {
        Swal.fire({
          title: 'Letra no encontrada',
          text: `Esa letra no existe en la oración`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
          showConfirmButton: false

        });
        letterNotFoubnd();
        setPoints(0);
        setInputValue('');
        setPlay(false);
      }
    }
  }
    , [player, dispatch, oration, inputValue, buyVocals, lettersData]);

  const winnerPlayer = useCallback(() => {

    if (player) {
      setPlayer({ ...player, total: player?.total + player.points, points: 0 });
      dispatch(add_user({ ...player, total: player?.total + player.points, points: 0 }));

      data.map((p) => {
        dispatch(add_user({ ...p, points: 0 }));
      })
      Swal.fire({
        title: 'Felicidades',
        text: `Ganaste el juego`,
        width: 700,
        padding: '3em',
        color: '#716add',
        background: `#fff url('${Backgroud}')`,
        customClass: 'alert-points',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false
      });
      setWinner(false);
      setPlay(false);

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
