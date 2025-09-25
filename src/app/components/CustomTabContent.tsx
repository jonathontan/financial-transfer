import { Icon } from "@iconify/react";
import { Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
import colors from "../../styles/colors";
import { FetchStatus } from "../enum/enums";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./CustomTabContent.module.css";
import CustomTabPanel from "./CustomTabPanel";
import { fetchAccount, internalTransfer } from "../accountSlice";

interface CustomTabContentProps {
  tabValue: number
}

function CustomTabContent(props: CustomTabContentProps) {
  const { tabValue } = props
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const account = useAppSelector((state) => state.account.user)
  const fetchStatus = useAppSelector((state) => state.account.fetchStatus)
  const [recipientAccount, setRecipientAccount] = useState<string>("")
  const [transferAmount, setTransferAmount] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [amountError, setAmountError] = useState<boolean>(false)
  const [recipientError, setRecipientError] = useState<boolean>(false)
  const [recipientErrorMsg, setRecipientErrorMsg] = useState<string>("")
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("")

  const handleReceipientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipientError(false)
    const value = event.currentTarget.value
    const validInput = /^\d+$/.test(value)

    if (account && Number(value) === account?.account_id) {
      setRecipientError(true)
      setRecipientErrorMsg("Enter a valid recipient account.")
    }

    if (value === "" || validInput)
      setRecipientAccount(event.currentTarget.value)
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const stringValue = event.currentTarget.value.trim()
    const value = parseFloat(stringValue || "0")
    const balance = parseFloat(account?.balance || "0")

    setAmountError(false)

    const validInput = /^(?:\d+|\d*\.\d{1,2})$/.test(stringValue)

    if (!validInput || Number(value) <= 0) {
      setAmountError(true)
      setAmountErrorMsg("Please enter a valid amount.")
    }

    if (value > balance) {
      setAmountError(true)
      setAmountErrorMsg("Amount exceeds your available balance.")
    }

    setTransferAmount(event.currentTarget.value)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    dispatch(internalTransfer({
      accountId: account?.account_id || 0,
      recipientId: Number(recipientAccount),
      amount: transferAmount
    }))
      .unwrap()
      .then((res) => {
        setTimeout(() => setIsLoading(false), 2000)

        if (res) {
          setTimeout(() => enqueueSnackbar(res, { variant: "error" }), 1000)
        } else {
          setTimeout(() => {
            enqueueSnackbar("Transaction completed successfully.", {
              variant: "success"
            })
            setRecipientAccount("")
            setTransferAmount("")
            dispatch(fetchAccount(account?.account_id || 0))
          }, 2000)
        }
      })
  }

  const transferTab = () => (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Typography>From</Typography>
          <TextField
            id="myaccount"
            fullWidth
            disabled
            value={account?.account_id}
          />
        </div>
        <div>
          <Typography>To</Typography>
          <TextField
            id="recipient"
            autoComplete="off"
            fullWidth
            error={recipientError}
            value={recipientAccount}
            onChange={handleReceipientChange}
          />
          {recipientError && (
            <Typography color="error">{recipientErrorMsg}</Typography>
          )}
        </div>
        <div>
          <Typography>Amount</Typography>
          <TextField
            id="amount"
            autoComplete="off"
            fullWidth
            error={amountError}
            value={transferAmount}
            onChange={handleAmountChange}
          />
          {amountError && (
            <Typography color="error">{amountErrorMsg}</Typography>
          )}
        </div>
        <Button
          disabled={fetchStatus === FetchStatus.LOADING ||
            isLoading || !transferAmount || !recipientAccount ||
            recipientError || amountError
          }
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
            <>Send</>
          ) : (
            <Icon
              color={colors.brandGreen}
              fontSize={28}
              icon="line-md:loading-twotone-loop" />
          )}
        </Button>
      </div>
    </div>
  )

  const renderContent = (value: number) => {
    switch (value) {
      case 0:
        return transferTab()
      case 1:
        return <></>
      default:
        return <>Tab not found</>
    }
  }

  return (
    <>
      <CustomTabPanel value={tabValue} currentTabValue={tabValue}>
        {renderContent(tabValue)}
      </CustomTabPanel>
    </>
  )
}

export default CustomTabContent