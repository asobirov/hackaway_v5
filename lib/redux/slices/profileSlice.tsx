import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  walletId: "",
  name: null,
  username: null,
  avatar: ""
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<any>) {
      const { id, walletId, name, username, avatar } = action.payload;
      state.id = id;
      state.walletId = walletId;
      state.name = name;
      state.username = username;
      state.avatar = avatar;
    }
  },
});

export const {
  updateProfile
} = profileSlice.actions;
export default profileSlice.reducer;
