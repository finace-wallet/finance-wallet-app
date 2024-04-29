import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Button = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}) => {
  const child = !!isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
  ) : (
    children
  );
  return (
    <button
      className={`flex items-center justify-center p-4 text-base font-semibold rounded-xl text-white ${className} min-h-[56px] ${
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
export default withErrorBoundary(Button, {
  FallbackComponent: ErrorComponent,
});
