import propTypes from "prop-types";

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
    <div>
      <label>
        {type !== "checkbox" && (
          <>
            <span>{label}</span>
            <br />
          </>
        )}
        <input
          type={type}
          name={name}
          required={required || null}
          onChange={onChange || null}
          autoComplete={autoComplete || null}
        />
        {type === "checkbox" && <span> {label}</span>}
      </label>
      <br />
      {errorMessage && <span>* {errorMessage}</span>}
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
