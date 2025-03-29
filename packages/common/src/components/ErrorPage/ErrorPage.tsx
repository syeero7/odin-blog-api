import {
  useRouteError,
  Link,
  isRouteErrorResponse,
  ErrorResponse,
} from "react-router-dom";
import styles from "./ErrorPage.module.css";

interface ErrorProps<T> {
  error: T;
}

function ErrorPage() {
  const error = useRouteError();

  return (
    <article className={styles.container}>
      {isRouteErrorResponse(error) ? (
        <ErrorResponse error={error} />
      ) : error instanceof Error ? (
        <StackTrace error={error} />
      ) : (
        <GenericError />
      )}
    </article>
  );

  function ErrorResponse({ error }: ErrorProps<ErrorResponse>) {
    return (
      <div>
        <h1>Oops! Something went wrong!</h1>

        <article className={styles.errorContent}>
          <p>
            {error.status} {error.statusText}
          </p>
          <p>
            Back to{" "}
            <Link viewTransition to="/">
              homepage
            </Link>
          </p>
        </article>
      </div>
    );
  }
}

function StackTrace({ error }: ErrorProps<Error>) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

function GenericError() {
  return <h1>Unknown Error</h1>;
}

export default ErrorPage;
