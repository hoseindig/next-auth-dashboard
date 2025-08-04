import { TextField } from "@mui/material";
import styles from "./Input.module.scss";
import { forwardRef } from "react";

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, placeholder, onChange, error }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <TextField
          fullWidth
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={!!error}
          helperText={error}
          inputRef={ref}
        />
      </div>
    );
  }
);

export default Input;
