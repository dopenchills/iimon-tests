import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import fruitsReducer from '../features/friuts/fruitsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fruits: fruitsReducer,
  },
});
