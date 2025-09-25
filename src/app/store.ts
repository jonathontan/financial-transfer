import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { uiReducer } from "./uiSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  account: accountReducer
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

export default store
