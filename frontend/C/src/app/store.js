import { configureStore } from '@reduxjs/toolkit';
import fruitsReducer from '../features/friuts/fruitsSlice';

export const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});
