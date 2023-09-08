import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './features/users-slice';
import letterSlice from './features/letters-slice';

const rootReducer = combineReducers({
  users: usersReducer,
  letters: letterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
