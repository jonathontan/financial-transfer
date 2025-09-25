import { Typography } from "@mui/material";
import styles from "./Navbar.module.css";

function Navbar() {

  return (
    <div className={styles.container}>
      <Typography
        fontSize={30}
        fontWeight={700}>
        Triple Transfers
      </Typography>
    </div>
  )
}

export default Navbar;
