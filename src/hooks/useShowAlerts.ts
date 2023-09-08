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
}


const useShowAlerts = ({ points, play, oration, inputValue, setPlay, setPoints }: Props) => {

  useEffect(() => {
    let active = true;

    if (active && play && inputValue) {
      const indice = oration.indexOf(inputValue);


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
        });
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
  }, [points, play, inputValue, oration, setPlay, setPoints]);

}

export default useShowAlerts;