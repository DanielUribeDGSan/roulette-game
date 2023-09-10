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
}


const useShowAlerts = ({ points, play, oration, inputValue, setPlay, setPoints, buyVocals, setBuyVocals, setInputValue }: Props) => {

  useEffect(() => {
    let active = true;

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
      setInputValue('');
    }


    if (active && play && points != 0 && !inputValue) {
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
          showConfirmButton: false

        });
        setBuyVocals(false);
        setInputValue('');
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
          showConfirmButton: false

        });
        setPoints(0);
        setInputValue('');
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
  }, [points, play, inputValue, oration, setPlay, setPoints, buyVocals, setBuyVocals, setInputValue]);

}

export default useShowAlerts;