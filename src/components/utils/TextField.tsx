import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setOpenLetter: React.Dispatch<React.SetStateAction<boolean>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  buyVocals: boolean;
}

export const TextFieldComponent = ({
  setOpenLetter,
  inputValue,
  setInputValue,
  setPlay,
  buyVocals,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Obtener el valor ingresado
    let newValue = event.target.value;

    // Utilizar una expresión regular para permitir solo letras
    newValue = buyVocals
      ? newValue.replace(/[^AEIOUaeiou]/g, '')
      : newValue.replace(/[AEIOUaeiou]/g, '');

    // Limitar la longitud a 1 carácter
    if (newValue.length > 1) {
      newValue = newValue.slice(0, 1);
    }

    // Convertir a mayúsculas
    newValue = newValue.toUpperCase();

    // Actualizar el estado
    setInputValue(newValue);
  };

  const handleBuy = () => {
    if (inputValue) {
      setOpenLetter(false);
      setPlay(true);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
        display: 'flex',
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label='Letra'
        variant='outlined'
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleBuy} sx={{ color: '#487698' }}>
        Buscar letra
      </Button>
    </Box>
  );
};
