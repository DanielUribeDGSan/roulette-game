import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Backgroud from '../assets/images/background/background.jpeg';


interface Props {
  points: number;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}


const useShowAlerts = ({ points, play, setPlay }: Props) => {

  useEffect(() => {
    let active = true;

    if (play) {
      if (active && points >= 1) {
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
      }
      if (active && points < 0) {
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
      }
    }

    return () => {
      active = false;
      setPlay(false);
    };
  }, [points, play, setPlay]);

}

export default useShowAlerts;