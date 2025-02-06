import { useRouteError, Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={styles.container}>
      <article>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className={styles.error}>
          {error.status} {error.statusText || error.message}
        </p>
        <p className={styles.link}>
          Back to <Link to="/">homepage</Link>
        </p>
      </article>
    </div>
  );
}

export default ErrorPage;
