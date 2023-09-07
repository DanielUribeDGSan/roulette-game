import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { delete_all_users } from '../redux/features/users-slice';

export const DeletePlayers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(delete_all_users());
  }, []);

  return <></>;
};
