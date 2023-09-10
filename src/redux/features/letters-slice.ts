import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorage, setLocalStorage } from '../../utils/localstorage';
import { LetterState } from '../../interfaces/letter';

const initialState: LetterState = {
  data: [],
};

const letterSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    add_letter: (state, { payload }: PayloadAction<string>) => {
      const letterIndex = state.data.findIndex((letter) => letter === payload);

      if (letterIndex !== -1) {
        state.data[letterIndex] = payload;
      } else {
        state.data.push(payload);
      }

      setLocalStorage('letters', state.data);
    },

    delete_letter: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter((letter) => letter !== payload);
      setLocalStorage('letters', state.data);
    },

    delete_all_letters: (state) => {
      state.data = [];
      setLocalStorage('letters', state.data);
    },

    get_letters: (state) => {
      state.data = getLocalStorage('letters');
    },

  },
});

export const {
  add_letter,
  delete_letter,
  delete_all_letters,
  get_letters

} = letterSlice.actions;

export default letterSlice.reducer;
