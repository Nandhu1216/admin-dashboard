function Input({ value, onChange, type = "text", placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={input}
    />
  );
}

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

export default Input;