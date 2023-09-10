import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { delete_all_letters } from '../redux/features/letters-slice';

export const Cleanletters = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(delete_all_letters());
  }, [dispatch]);

  return <></>;
};
