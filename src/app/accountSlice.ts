import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../enum/enums";
import accountService from "../services/accountService";
import { Account } from "./interfaces/account";
import transactionService from "../services/transactionService";

interface AccountSliceState {
  user: Account | undefined
  fetchStatus: FetchStatus
}

const accountInitialState: AccountSliceState = {
  user: undefined,
  fetchStatus: FetchStatus.IDLE
}

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.fetchStatus = FetchStatus.LOADING
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.COMPLETED
        state.user = action.payload
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.fetchStatus = FetchStatus.FAILED
      })
  },
})

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (id: number) => {
    try {
      const response = await accountService.getAccount(id)
      const responseData = response.ok ? await response.json() : await response.text()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error) return e.message
    }
  }
)

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (id: number) => {
    try {
      const response = await accountService.createAccount(id)
      const responseData = response.ok ? await response.json() : await response.text()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error) return e.message
    }
  }
)

export const internalTransfer = createAsyncThunk(
  "account/internalTransfer",
  async (data: { accountId: number, recipientId: number, amount: string }) => {
    try {
      const response = await transactionService.internalTransfer(
        data.accountId, data.recipientId, data.amount)
      const responseData = await response.text()

      return responseData
    } catch (e: unknown) {
      if (e instanceof Error) return e.message
    }
  }
)

export const accountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer