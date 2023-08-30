import { configureStore } from "@reduxjs/toolkit";
import paletteReducer from "./../components/utils/slices/paletteSlice";
const store = configureStore({
  reducer: {
    palettes: paletteReducer,
  },
});

export default store;
