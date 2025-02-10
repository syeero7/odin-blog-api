import { useRouteError, Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();

  console.error(`status: ${error.status} ${error.statusText}`);
  if (error.data?.message) console.error(`error: ${error.data.message}`);

  return (
    <div className={styles.container}>
      <article>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className={styles.error}>
          {error.status} {error.statusText}
        </p>
        <p className={styles.link}>
          Back to <Link to="/">homepage</Link>
        </p>
      </article>
    </div>
  );
}

export default ErrorPage;
