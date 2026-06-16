import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './slices/filmsSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
});