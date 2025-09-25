import { createSlice } from "@reduxjs/toolkit";

interface UISliceState {
  mobileBreakpoint: boolean
  tabletBreakpoint: boolean
  isLoggedIn: boolean
}

const uiInitialState: UISliceState = {
  mobileBreakpoint: false,
  tabletBreakpoint: false,
  isLoggedIn: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    setMobileBreakpoint: (state, action) => {
      state.mobileBreakpoint = action.payload
    },
    setTabletBreakpoint: (state, action) => {
      state.tabletBreakpoint = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  }
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer