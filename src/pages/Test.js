import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const showToastMessage = () => {
    toast.success("Success Notification !");
  };

  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <div className="flex flex-col text-sm font-semibold bg-white"></div>
      <ToastContainer />
    </div>
  );
};

export default Test;
