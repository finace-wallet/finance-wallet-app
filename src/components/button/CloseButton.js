import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CloseButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 right-0 m-4 transform translate-x-full -translate-y-1/2"
    >
      <div className="w-[30px] h-[30px] bg-red-500 rounded-full items-center pt-1">
        <FontAwesomeIcon icon={faX} />
      </div>
    </button>
  );
};

export default CloseButton;
