import React from "react";
import PropTypes from "prop-types";

const Button = ({ type = "button", onClick, children, className = "" }) => {
  return (
    <button
      className={`flex items-center justify-center p-4 text-base font-semibold rounded-xl text-white ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
export default Button;
