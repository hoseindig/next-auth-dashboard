import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.scss";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <MuiButton className={styles.button} variant="contained" onClick={onClick}>
      {children}
    </MuiButton>
  );
}
