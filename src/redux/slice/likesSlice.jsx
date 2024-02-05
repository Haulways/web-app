import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    likes: []
}

const likesSlice = createSlice({
    name: 'like',
    initialState,
      reducers: {
          STORE_LIKES(state, action) {
          state.likes = action.payload.likes;
          }
    }
});

export const { STORE_LIKES } = likesSlice.actions;

export const selectLikes = (state) => state.like.likes;

export default likesSlice.reducer