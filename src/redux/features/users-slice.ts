import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorageScore, setLocalStorage } from '../../utils/localstorage';
import { Score } from '../../interfaces/sccore';
import { UsersState } from '../../interfaces/users';



const initialState: UsersState = {
  data: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add_user: (state, { payload }: PayloadAction<Score>) => {
      const userIndex = state.data.findIndex((user) => user.user === payload.user);

      if (userIndex !== -1) {
        state.data[userIndex] = payload;
      } else {
        state.data.push(payload);
      }

      setLocalStorage('users', state.data);
    },

    delete_user: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter((user) => user.user !== payload);
      setLocalStorage('users', state.data);
    },

    delete_all_users: (state) => {
      state.data = [];
      setLocalStorage('users', state.data);
    },

    get_users: (state) => {
      state.data = getLocalStorageScore('users');
    },

  },
});

export const {
  add_user,
  delete_user,
  delete_all_users,
  get_users
} = userSlice.actions;

export default userSlice.reducer;
