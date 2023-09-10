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
  setFounLetter: React.Dispatch<React.SetStateAction<boolean>>;
}


const useShowAlerts = ({ points, play, oration, inputValue, setPlay, setPoints, buyVocals, setBuyVocals, setFounLetter }: Props) => {

  useEffect(() => {
    let active = true;

    if (active && play && inputValue) {
      const indice = oration.indexOf(inputValue);

      if (buyVocals && indice !== -1) {
        Swal.fire({
          title: 'Letra comprada',
          text: `Has comprado la vocal: ${inputValue} `,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
        });
        setBuyVocals(false);
        setFounLetter(true);
      } else if (points > 0 && indice !== -1) {
        Swal.fire({
          title: 'Has ganado',
          text: `${points}  puntos`,
          width: 700,
          padding: '3em',
          color: '#716add',
          background: `#fff url('${Backgroud}')`,
          customClass: 'alert-points',
          confirmButtonText: 'Aceptar',
        });
        setPoints(0);
        setFounLetter(true);
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
        });
        setPoints(0);
      }

    }

    if (active && play && points < 0) {
      Swal.fire({
        title: 'Ooops',
        text: `Pierdes turno`,
        width: 700,
        padding: '3em',
        color: '#716add',
        background: `#fff url('${Backgroud}')`,
        customClass: 'alert-points',
        confirmButtonText: 'Aceptar',
      });
      setPlay(false);
      setPoints(0);
    }


    if (active && play && points != 0) {
      Swal.fire({
        title: 'No escribiste una letra',
        text: `Intentalo de nuevo`,
        width: 700,
        padding: '3em',
        color: '#716add',
        background: `#fff url('${Backgroud}')`,
        customClass: 'alert-points',
        confirmButtonText: 'Aceptar',
      });
      setPlay(false);
      setPoints(0);
    }




    return () => {
      active = false;
    };
  }, [points, play, inputValue, oration, setPlay, setPoints, buyVocals, setBuyVocals]);

}

export default useShowAlerts;