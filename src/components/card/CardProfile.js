import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DeleteUserPage from "../../pages/DeleteUserPage";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, CloseButton } from "components/button";
import { editUserData, getUserData } from "api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  fullName: yup.string().required("Username is required"),
});

const CardProfile = ({ user }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("user Card Profile", user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleEdit = async (data) => {
    try {
      const response = await editUserData(data, token);
      console.log(response);
      closeModal();
      reset({});
      toast.success("Success Edit, Redirecting...");
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    } catch (error) {
      console.error("Error occurred while edit:", error);
      toast.error("Error occurred while edit");
      // Handle error scenario, e.g., display an error message
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
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
          <div className="p-5 font-semibold text-softBlue">
            {user?.fullName || "Default username here"}
          </div>

          <div
            className="mt-16 mr-4 cursor-pointer hover:underline"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            Edit your profile
          </div>
        </div>
        <DeleteUserPage></DeleteUserPage>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {" "}
          {/* Update z-index */}
          <div className="p-8 bg-white w-96">
            <CloseButton onClick={closeModal} />
            <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
            {/* Your form or editing components go here */}
            <form onSubmit={handleSubmit(handleEdit)}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  control={control}
                  name="fullName"
                  placeholder="Input your fullname here"
                  value={user?.fullName || "abcxyz"}
                  error={errors.fullName?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  control={control}
                  name="address"
                  placeholder="Input your address here"
                  error={errors.address?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  control={control}
                  name="phoneNumber"
                  placeholder="Input your phone here"
                  error={errors.phoneNumber?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="birthDate">Birthdate:</Label>
                <Input
                  control={control}
                  name="birthDate"
                  placeholder="MM/DD/yyyy"
                  error={errors.birthDate?.message}
                ></Input>
              </FormGroup>
              <Button type="submit" className="w-full bg-primary">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Change user detail"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProfile;
