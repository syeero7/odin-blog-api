import propTypes from "prop-types";

function InputField({ label, name, type = "text", required = true, onChange }) {
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
        />
        {type === "checkbox" && <span> {label}</span>}
      </label>
    </div>
  );
}

InputField.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string,
  required: propTypes.bool,
  onChange: propTypes.func,
};

export default InputField;
