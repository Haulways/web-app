import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
        STORE_USERS(state, action) {
            state.users = action.payload.users
      }
  }
});

export const { STORE_USERS } = usersSlice.actions;

export const selectUsers = (state) => state.user.users;

export default usersSlice.reducer