import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { add_letter } from '../redux/features/letters-slice';

export const RegisterLetters = () => {
  const dispatch = useDispatch();

  const letters: string[] = useMemo(() => ['A', 'B'], []);

  useEffect(() => {
    letters.forEach((letter) => {
      dispatch(add_letter(letter));
    });
  }, [dispatch, letters]);

  return <></>;
};
