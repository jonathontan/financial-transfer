import { Icon } from "@iconify/react";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, fetchAccount } from "../app/accountSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../app/uiSlice";
import { FetchStatus } from "../enum/enums";
import colors from "../styles/colors";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [accountId, setAccountId] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchStatus = useAppSelector((state) => state.account.fetchStatus)

  const handleAccountIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsError(false)
    setAccountId(event.currentTarget.value)
  }

  const handleFormChange = () => {
    setIsCreate(!isCreate)
    setAccountId("")
    setIsError(false)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    const validInput = /^\d+$/.test(accountId)

    if (!validInput) {
      setTimeout(() => {
        setErrorMsg("Please enter numbers only.")
        setIsError(true)
        setIsLoading(false)
      }, 500)

      return
    }

    if (!isCreate)
      dispatch(fetchAccount(Number(accountId)))
        .unwrap()
        .then(res => {
          if (typeof res === "string") {
            setTimeout(() => {
              setIsError(true)
              setIsLoading(false)
              enqueueSnackbar(res, { variant: "error" })
            }, 2000)
          } else {
            dispatch(uiActions.setIsLoggedIn(true))
            setTimeout(() => navigate("/"), 2000)
          }
        })
    else
      dispatch(createAccount(Number(accountId)))
        .unwrap()
        .then((res) => {
          if (typeof res === "string") {
            setTimeout(() => {
              setIsError(true)
              enqueueSnackbar(res, { variant: "error" })
              setIsLoading(false)
            }, 2000)
          } else {
            setTimeout(() => {
              enqueueSnackbar(`Your account has been created successfully. 
              You may login with your new account.`, {
                variant: "success"
              })
              setIsCreate(false)
              setAccountId("")
              setIsLoading(false)
            }, 2000)
          }
        })
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Typography fontSize={30} fontWeight={700} textAlign="center">Triple Transfers</Typography>
        <div>
          <TextField
            autoComplete="off"
            error={isError}
            disabled={fetchStatus === FetchStatus.LOADING}
            value={accountId}
            onChange={handleAccountIdChange}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleSubmit(e)
            }}
            id="accountId"
            type="text"
            placeholder="Account ID"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={isError ? 'error' : 'primary'}
          />
        </div>
        {isError && (
          <Typography textTransform="capitalize" color="error">
            {errorMsg}
          </Typography>
        )}
        <Button
          disabled={fetchStatus === FetchStatus.LOADING || !accountId.length || isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            minHeight: 30,
            fontSize: 16,
            fontWeight: 700,
            textTransform: 'capitalize',
            color: colors.brandWhite,
            backgroundColor: colors.brandBlue
          }}
          onClick={handleSubmit}
        >
          {!isLoading ? (
            <>{isCreate ? 'Create' : 'Login'}</>
          ) : (
            <Icon
              color={colors.brandGreen}
              fontSize={28}
              icon="line-md:loading-twotone-loop" />
          )}
        </Button>
        {!isCreate ? (
          <Link
            underline="hover"
            className={styles.link}
            onClick={handleFormChange}>
            Create an Account
          </Link>
        ) : (
          <Link
            underline="hover"
            className={styles.link}
            onClick={handleFormChange}>
            Back to Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default LoginPage