import { useDispatch } from 'react-redux';
import {
  add_letter,
  delete_all_letters,
} from '../../redux/features/letters-slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import usePlayers from '../../hooks/usePlayers';

interface Props {
  oration: string;
  setWinner: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonFloat = ({ oration, setWinner }: Props) => {
  const dispatch = useDispatch();
  const { addPlayers } = usePlayers();

  const stringToCharArray = (inputString: string) => {
    const charArray = inputString.replace(/\s/g, '').split('');
    return charArray;
  };

  const handleClick = () => {
    const charArray = stringToCharArray(oration);

    charArray.map((letter) => {
      dispatch(add_letter(letter));
    });

    setWinner(true);
  };

  const handleClickReset = () => {
    dispatch(delete_all_letters());
  };

  const handleClickAddPlayers = () => {
    addPlayers();
  };

  return (
    <div className='buttons__float'>
      <button className='btn-float' onClick={handleClick}>
        <CheckCircleIcon />
      </button>
      <button className='btn-float reset' onClick={handleClickReset}>
        <RestartAltIcon />
      </button>
      <button className='btn-float players' onClick={handleClickAddPlayers}>
        <PersonAddAltIcon />
      </button>
    </div>
  );
};
