import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {error.status} {error.statusText || error.message}
      </p>
      <p>
        Back to <Link to="/">homepage</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
