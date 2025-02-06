import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteIds: string[];
}

const initialState: FavoriteState = {
  favoriteIds: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
