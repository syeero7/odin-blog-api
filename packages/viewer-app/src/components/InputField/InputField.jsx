import propTypes from "prop-types";
import styles from "./InputField.module.css";

function InputField({
  label,
  name,
  type,
  errorMessage,
  required = true,
  onChange,
  autoComplete,
}) {
  return (
    <div className={styles.container}>
      <label className={type === "checkbox" ? styles.checkbox : null}>
        {type !== "checkbox" && <span>{label}</span>}
        <input
          className={type !== "checkbox" ? styles.field : null}
          type={type}
          name={name}
          required={required || null}
          onChange={onChange || null}
          autoComplete={autoComplete || null}
        />
        {type === "checkbox" && <span> {label}</span>}
      </label>

      {errorMessage && (
        <span aria-live="polite" className={styles.error}>
          * {errorMessage}
        </span>
      )}
    </div>
  );
}

InputField.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  errorMessage: propTypes.string,
  required: propTypes.bool,
  onChange: propTypes.func,
  autoComplete: propTypes.string,
};

export default InputField;
