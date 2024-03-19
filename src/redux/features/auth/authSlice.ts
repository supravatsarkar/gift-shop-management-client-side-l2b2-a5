import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserState } from "../../../types";

export type TAuthState = {
  token: string | null;
  user: TUserState | null;
};

const initialState: TAuthState = {
  token: null,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
