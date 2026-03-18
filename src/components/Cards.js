function Card({ children }) {
  return (
    <div style={card}>
      {children}
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px"
};

export default Card;