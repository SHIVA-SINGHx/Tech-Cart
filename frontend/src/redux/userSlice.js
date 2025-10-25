import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      localStorage.removeItem('accessToken')
    },
  },
})

export const { setUser, setAccessToken, logout } = userSlice.actions
export default userSlice.reducer