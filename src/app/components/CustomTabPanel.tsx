import { ReactNode } from "react";
import styles from "./CustomTabPanel.module.css";

interface TabPanelProps {
  children?: ReactNode;
  value: number;
  currentTabValue: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, currentTabValue, value, ...other } = props

  return (
    <div
      className={styles["tab-panel"]}
      role="tabpanel"
      hidden={currentTabValue !== value}
      {...other}
    >
      {currentTabValue === value && children}
    </div>
  )
}

export default CustomTabPanel