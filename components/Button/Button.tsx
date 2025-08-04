import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.scss";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  loading: boolean;
}

export default function Button({ children, onClick, loading }: ButtonProps) {
  return (
    <MuiButton
      className={styles.button}
      variant="contained"
      onClick={onClick}
      loading={loading}
    >
      {children}
    </MuiButton>
  );
}
