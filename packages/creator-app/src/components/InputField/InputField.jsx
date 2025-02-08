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
  value,
  checked = false,
}) {
  return (
    <div className={styles.container}>
      <label className={type === "checkbox" ? styles.checkbox : null}>
        {type === "checkbox" ? (
          <>
            <input
              type={type}
              name={name}
              required={required || null}
              onChange={onChange || null}
              defaultChecked={checked}
            />
            <span> {label}</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            <input
              className={styles.field}
              type={type}
              name={name}
              required={required || null}
              onChange={onChange || null}
              autoComplete={autoComplete || null}
              defaultValue={value || null}
            />
          </>
        )}
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
  value: propTypes.string,
  checked: propTypes.bool,
};

export default InputField;
