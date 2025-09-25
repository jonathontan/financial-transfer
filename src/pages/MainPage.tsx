import { Icon } from "@iconify/react";
import { IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavigationTab from "../app/components/NavigationTab";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../app/uiSlice";
import constants from "../constants";
import styles from "./MainPage.module.css";

function MainPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const mobileBreakpoint = useMediaQuery(`(max-width: ${constants.mobileBreakpoint}px`)
  const tabletBreakpoint = useMediaQuery(`(max-width: ${constants.tabletBreakpoint}px`)
  const account = useAppSelector((state) => state.account.user)
  const [hideBalance, setHideBalance] = useState<boolean>(true)

  useEffect(() => {
    dispatch(uiActions.setMobileBreakpoint(mobileBreakpoint))
  }, [mobileBreakpoint])

  useEffect(() => {
    dispatch(uiActions.setTabletBreakpoint(tabletBreakpoint))
  }, [tabletBreakpoint])

  useEffect(() => {
    if (!account) navigate("/login")
  }, [account])

  const handleHideBalanceButton = () => {
    setHideBalance(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.balance}>
          <Typography fontSize={40} fontWeight={500}>
            ${hideBalance ?
              "*".repeat(Number(account?.balance).toFixed(2).length)
              : Number(account?.balance).toFixed(2)}
          </Typography>
          <Tooltip
            placement="right"
            title={hideBalance ? "Show" : "Hide"}
          >
            <IconButton
              size="small"
              onClick={handleHideBalanceButton}
            >
              <Icon icon={`mdi:${hideBalance ? 'show' : 'hide'}`} />
            </IconButton>
          </Tooltip>
        </div>
        <Typography fontSize={16}>{`Account ID: ${account && account?.account_id}`}</Typography>
      </div>
      <div className={styles["navigation-container"]}>
        <NavigationTab />
      </div>
    </div>
  )
}

export default MainPage