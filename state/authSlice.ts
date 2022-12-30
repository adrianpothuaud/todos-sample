import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  token?: string
}

const initialState: AuthState = {
  isAuth: false,
  token: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuth = true
      state.token = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.token = undefined
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
