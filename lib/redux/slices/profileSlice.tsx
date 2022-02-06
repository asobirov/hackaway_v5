import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  walletId: "",
  name: null,
  username: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<any>) {
      const { id, walletId, name, username } = action.payload;
      state.id = id;
      state.walletId = walletId;
      state.name = name;
      state.username = username;
    }
  },
});

export const {
  updateProfile
} = profileSlice.actions;
export default profileSlice.reducer;
