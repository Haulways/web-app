import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

const postsSlice = createSlice({
  name: 'post',
  initialState,
    reducers: {
        STORE_POSTS(state, action) {
        state.posts = action.payload.posts;
      },
  }
});

export const { STORE_POSTS  } = postsSlice.actions;

export const selectPosts = (state) => state.post.posts;

export default postsSlice.reducer