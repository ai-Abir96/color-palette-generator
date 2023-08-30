import { createSlice } from "@reduxjs/toolkit";

const paletteSlice = createSlice({
  name: "palettes",
  initialState: {
    colors: ["#FF5733", "#34FFA2", "#438AFF", "#FD33E9"],
    savedPalettes: [],
  },
  reducers: {
    savePalette: (state, action) => {
      state.savedPalettes.push(action.payload);
    },
    clearPalette: (state) => {
      state.savedPalettes = [];
    },
    updateColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const { savePalette, clearPalette, updateColors } = paletteSlice.actions;
export default paletteSlice.reducer;
