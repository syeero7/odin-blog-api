import { useRouteError } from "react-router-dom";

export default function FormError() {
  const { data } = useRouteError();

  return data.errors ? (
    <ul aria-live="polite">
      {data.errors.map((error, i) => (
        <li key={i}>{error.msg}</li>
      ))}
    </ul>
  ) : (
    <p aria-live="polite">{data.message} </p>
  );
}
