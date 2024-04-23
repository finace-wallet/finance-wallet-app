import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CardProfile = ({ user }) => {
  return (
    <div>
      <div className="w-[500px] h-[300px] mx-auto m-5 relative">
        <div className="h-[50%] bg-softBlue rounded-t-xl flex justify-between text-white">
          <div className="p-5"> Your Profile </div>
          <div className="p-5"> Joined since 2023 </div>
        </div>
        <div className="absolute z-10 flex items-center justify-center w-20 h-20 transform -translate-x-1/2 rounded-full bg-strock left-20 top-28">
          <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-strock">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="h-[50%] bg-white rounded-b-xl flex justify-between items-center">
          <div className="p-5 font-semibold text-softBlue">{user[0].name}</div>

          <div className="mt-16 mr-4 cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            Edit your profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
