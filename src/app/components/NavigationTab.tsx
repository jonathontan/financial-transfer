import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import colors from "../../styles/colors";
import { accountActions } from "../accountSlice";
import { useAppDispatch } from "../hooks";
import CustomTabContent from "./CustomTabContent";
import styles from "./NavigationTab.module.css";

function NavigationTab() {
  const dispatch = useAppDispatch()
  const [tabValue, setTabValue] = useState<number>(0)

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    _event.preventDefault()
    setTabValue(newValue)

    if (newValue === 1)
      dispatch(accountActions.setUser(undefined))
  }

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        slotProps={{
          indicator: {
            hidden: true
          }
        }}
        sx={{
          ".MuiTabs-list": {
            padding: "10px",
            justifyContent: "center"
          },
          "& .MuiTab-root.Mui-selected": {
            color: colors.brandBlack,
            borderRadius: 2,
            backgroundColor: colors.brandWhite,
            boxShadow: "0 0 10px 2px rgba(0,0,0,0.2)"
          }
        }}
      >
        <Tab label="Transfer" className={styles.tabs} />
        <Tab label="Logout" className={styles.tabs} />
      </Tabs>

      <CustomTabContent tabValue={tabValue} />
    </>

  )
}

export default NavigationTab