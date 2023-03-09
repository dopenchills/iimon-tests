import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leftFruits: [
    "Apple",
    "Grape",
    "Strawberry",
    "Cherry",
    "Plum"
  ],
  rightFruits: [
    "Watermelon",
    "Banana",
    "Peach"
  ]
};

const fruitsSlice = createSlice({
  name: 'fruits',
  initialState,
  reducers: {
    moveToRight: (state) => {
      if (state.leftFruits.length > 0) {
        state.rightFruits = [...state.rightFruits, state.leftFruits.slice(-1)];
        state.leftFruits  = state.leftFruits.slice(0, state.leftFruits.length - 1);  
      }
    },
    moveToLeft: (state) => {
      if (state.rightFruits.length > 0) {
        state.leftFruits  = [...state.leftFruits, state.rightFruits.slice(-1)];
        state.rightFruits = state.rightFruits.slice(0, state.rightFruits.length - 1);  
      }
    }
  }
})

export const { moveToRight, moveToLeft }  = fruitsSlice.actions;
export const selectLeftFruits  = (state) => state.fruits.leftFruits;
export const selectRightFruits = (state) => state.fruits.rightFruits;
export default fruitsSlice.reducer;
