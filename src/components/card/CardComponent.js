import {
  faEnvelope,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CardComponent = ({ children, heading = "", type = "" }) => {
  const iconMap = {
    email: faEnvelope,
    phone: faPhone,
    house: faHouse,
    // Add more types and corresponding icons as needed
  };
  const icon = iconMap[type] || faEnvelope;
  return (
    <>
      <div className=" mx-auto w-[600px]">
        <div className="flex justify-between p-5">
          <span className="mt-2 text-xl font-semibold">{heading}</span>
        </div>
        <div className="rounded-xl border-[0.8px] border-softWhite bg-softWhite p-2 flex items-center">
          <FontAwesomeIcon icon={icon} className="mr-4" />
          <div className="flex flex-col">
            <span>{children.title}</span>
            <span>{children.content}</span>
            <span className="text-sm text-gray-400">
              {children.notification}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
