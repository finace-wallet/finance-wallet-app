import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";
import classNames from "util/classNames";

const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        className={classNames(
          "w-full px-6 py-4 text-sm font-medium border rounded-xl text-text1 placeholder:text-text4 dark:placeholder:text-text2 dark:text-white bg-transparent",
          error.length > 0
            ? "border-error"
            : "border-strock dark:border-darkStroke",
          children ? "pr-16" : ""
        )}
        placeholder={error.length <= 0 ? placeholder : ""}
        {...rest}
        {...field}
      />
      {error.length > 0 && (
        <span className="text-sm font-medium pointer-events-none text-error">
          {error}
        </span>
      )}
      {children && (
        <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
  value: PropTypes.string,
};

export default withErrorBoundary(Input, {
  FallbackComponent: <ErrorBoundary></ErrorBoundary>,
});
