import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
