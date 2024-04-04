import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  age: number;
  logged: boolean;
}

const initialState: UserState = {
  username: "",
  age: 0,
  logged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /*
    do not forget to import PayloadAction in the reduxj/toolkit
    login: (state, action: PayloadAction<User>) => {
      state = action.payload
    }
    */
    login: (state) => {
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
