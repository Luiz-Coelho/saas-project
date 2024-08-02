import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  username: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  email: "",
  username: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      (state.id = action.payload.id),
        (state.email = action.payload.email),
        (state.username = action.payload.username),
        (state.isLoggedIn = true);
    },
    logout: (state) => {
      (state.id = ""),
        (state.email = ""),
        (state.username = ""),
        (state.isLoggedIn = false);
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
