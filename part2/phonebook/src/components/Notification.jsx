const NotificationBanner = ({ message, error }) => {
  const baseStyle = {
    padding: "12px 16px",
    margin: "12px 0",
    borderRadius: "8px",
    fontSizeL: "16px",
    fontWeight: "500",
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "opacity 0.3s ease-in-out",
  };

  const errorStyle = {
    ...baseStyle,
    backgroundColor: "#f44336",
    border: "1px solid #d32f2f",
  };
  const successStyle = {
    ...baseStyle,
    backgroundColor: "#4caf50",
    border: "1px solid #388e3c",
  };

  if (message === "") return <></>;
  return (
    <div style={error ? errorStyle : successStyle}>
      <p>{message}</p>
    </div>
  );
};

export default NotificationBanner;
