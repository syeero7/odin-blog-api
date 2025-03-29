import { FormHTMLAttributes } from "react";
import styles from "./UserForm.module.css";

function UserForm({ children, action }: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <main className={styles.container}>
      <form action={action} className={styles.form}>
        {children}
      </form>
    </main>
  );
}

export default UserForm;
