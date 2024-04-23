import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";

const LayoutTwoColumn = ({ children, leftHeading = "", rightHeading = "" }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-200">
          {/* Left panel content */}
          <h2 className="mb-4 text-xl font-bold">{leftHeading}</h2>
          {children.left}
        </div>
        <div className="p-4 bg-gray-300">
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
