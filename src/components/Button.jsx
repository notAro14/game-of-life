import React from "react";

const Button = ({ children, handleClick, variant = "primary" }) => {
  return (
    <button onClick={handleClick} className={`btn ${variant}`}>
      {children}
    </button>
  );
};
export default Button;
