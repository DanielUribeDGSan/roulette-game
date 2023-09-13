import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Backgroud from '../assets/images/background/background.jpeg';


interface Props {
  points: number;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  oration: string;
  inputValue: string;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  buyVocals: boolean;
  setBuyVocals: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  winner: boolean;
  setWinner: React.Dispatch<React.SetStateAction<boolean>>;
  loseTurn: boolean;
  setLoseTurn: React.Dispatch<React.SetStateAction<boolean>>;
  lettersData: string[];
  finishedProcess: boolean;
  setFinishedprocess: React.Dispatch<React.SetStateAction<boolean>>;
}

const useShowAlerts = ({ points, play, oration, inputValue, setPlay, setPoints, buyVocals, setBuyVocals, setInputValue, winner, setWinner, loseTurn,
  setLoseTurn, lettersData, finishedProcess,
  setFinishedprocess }: Props) => {

  useEffect(() => {
    let active = true;

    if (inputValue && buyVocals && play) {
      const indice = oration.indexOf(inputValue);

      if (active && buyVocals && indice !== -1 && !lettersData.includes(inputValue)) {
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
        setInputValue('');
        setPlay(false);
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
        setBuyVocals(false);
        setInputValue('');
        setPlay(false);
      }
    }

    return () => {
      active = false;
    }
  }, [buyVocals, setBuyVocals, setInputValue, oration, inputValue, play, lettersData, setPlay])

  useEffect(() => {
    let active = true;

    if (active && winner) {
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
    }

    setPlay(false);

    return () => {
      active = false;
    }
  }, [winner, setWinner, setPlay])


  useEffect(() => {
    let active = true;

    if (active && play && points != 0 && !inputValue && !loseTurn) {
      Swal.fire({
        title: 'No escribiste una letra',
        text: `Intentalo de nuevo`,
        width: 700,
        padding: '3em',
        color: '#716add',
        background: `#fff url('${Backgroud}')`,
        customClass: 'alert-points',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false
      });
      setPlay(false);
      setPoints(0);
      setInputValue('');
    }

    if (active && play && loseTurn) {
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
      setPlay(false);
      setPoints(0);
      setInputValue('');
      setLoseTurn(false);
    }

    return () => {
      active = false;
    }
  }, [inputValue, play, points, setInputValue, setPlay, setPoints, loseTurn,
    setLoseTurn])


  useEffect(() => {
    let active = true;

    if (active && play && inputValue && !buyVocals && finishedProcess) {
      const indice = oration.indexOf(inputValue);

      if (!lettersData.includes(inputValue)) {

        if (points > 0 && indice !== -1) {
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
          setFinishedprocess(false);
        } else {
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
          setPoints(0);
          setInputValue('');
          setPlay(false);
          setFinishedprocess(false);
        }
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
        setPoints(0);
        setInputValue('');
        setPlay(false);
        setFinishedprocess(false);
      }

    }

    setTimeout(() => {
      if (active) {
        Swal.close();
      }
    }, 2000);

    return () => {
      active = false;
    };
  }, [points, play, inputValue, oration, buyVocals, lettersData, finishedProcess, setFinishedprocess, setInputValue, setPlay, setPoints]);

}

export default useShowAlerts;