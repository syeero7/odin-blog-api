import { type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, type, ...props }: InputProps) {
  return (
    <div className={styles.container}>
      <label className={type === "checkbox" ? styles.checkbox : undefined}>
        {type === "checkbox" ? (
          <>
            <input {...props} type={type} />
            <span> {label}</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            <input {...props} type={type} className={styles.field} />
          </>
        )}
      </label>

      <span aria-live="polite" className={styles.error}>
        {error && <>* {error}</>}
      </span>
    </div>
  );
}

export default Input;
