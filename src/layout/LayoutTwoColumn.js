import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";

const LayoutTwoColumn = ({
  children,
  leftHeading = "",
  rightHeading = "",
  leftStyle = "",
  rightStyle = "",
}) => {
  return (
    <>
      <div className="flex flex-col w-4/5 h-full mx-auto sm:flex-row">
        <div className={`flex-1 p-4 bg-softGrey ${leftStyle}`}>
          {/* Left panel content */}
          <h2 className="mb-4 text-xl font-bold">{leftHeading}</h2>
          {children.left}
        </div>
        <div className={`flex-1 p-4 bg-softGrey ${rightStyle}`}>
          {/* Right Panel content */}
          <h2 className="mb-4 text-xl font-bold">{rightHeading}</h2>
          {children.right}
        </div>
      </div>
    </>
  );
};

LayoutTwoColumn.propTypes = {
  leftHeading: PropTypes.string,
  rightHeading: PropTypes.string,
  children: PropTypes.shape({
    left: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired,
  }).isRequired,
};

export default withErrorBoundary(LayoutTwoColumn, {
  FallbackComponent: ErrorComponent,
});
