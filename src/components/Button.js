function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={btn}>
      {children}
    </button>
  );
}

const btn = {
  padding: "10px 16px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Button;