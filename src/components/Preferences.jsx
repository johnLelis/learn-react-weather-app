const Preferences = ({
  label,
  controlId,
  options = [],
  preferenceValue,
  onChange,
}) => {
  return (
    options.length > 0 && (
      <div className="preference-group">
        <label htmlFor={controlId}>{label}:</label>
        <select
          id={controlId}
          value={preferenceValue}
          onChange={e => onChange(controlId, e.target.value)}
        >
          {options.map(({ value, placeholder }, index) => (
            <option key={index} value={value}>
              {placeholder}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default Preferences;
