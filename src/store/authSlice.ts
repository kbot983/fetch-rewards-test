import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setLogoutUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLogoutUser } = authSlice.actions;
export default authSlice.reducer;
