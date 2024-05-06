import { yupResolver } from "@hookform/resolvers/yup";
import { shareWallet } from "api/WalletShareApi";
import { Button, CloseButton } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { Label } from "components/label";
import { CO_OWNER, VIEWER } from "constants/variableConstants";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  shareEmail: yup
    .string()
    .email("Email must be in correct format")
    .required("Username is required"),
  accessLevel: yup.string(),
});

const WalletShare = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [accessLevel, setAccessLevel] = useState("co-owner");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const selectedWalletId = useSelector((state) => state.wallet.wallets.id);

  const handleShareWallet = async (data) => {
    data.shareWalletId = selectedWalletId;
    console.log("Form data:", data);
    const response = await shareWallet(data);
    if (response.status === 201) {
      toast.success("Wallet shared successfully");
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
    console.log(response);
  };

  const handleChangeAccessLevel = (e) => {
    setAccessLevel(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col justify-center p-4 max-w-[200px] mx-auto">
        <button
          className=" justify-center text-base bg-blue-500 hover:bg-blue-700font-semibold rounded-xl text-white min-h-[56px] mx-auto max-w-[200px] min-w-[200px]"
          onClick={openModal}
        >
          Share Wallet
        </button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)", // Adjust opacity as needed
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              width: 400,
              height: 300,
              backgroundColor: "white",
              padding: 20,
              border: "1px solid #ccc",
              borderRadius: 5,
              outline: "none", // Remove default focus outline
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          {/* Modal content goes here */}
          <CloseButton onClick={closeModal}></CloseButton>
          <h2>Share Wallet</h2>
          <p>Enter the amount and recipient details here.</p>
          <form onSubmit={handleSubmit(handleShareWallet)}>
            <FormGroup>
              <Label htmlFor="shareEmail">Email*</Label>
              <Input
                control={control}
                name="shareEmail"
                placeholder="Input your shareEmail here"
                error={errors.shareEmail?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Access Level*</Label>
              <div className="flex items-center">
                <input
                  {...register("accessLevel")}
                  control={control}
                  type="radio"
                  id="co-owner"
                  name="accessLevel"
                  value={CO_OWNER}
                  onChange={handleChangeAccessLevel}
                />
                <span className="ml-2">Co-owner</span>
              </div>
              <div className="flex items-center mt-2">
                <input
                  {...register("accessLevel")}
                  control={control}
                  type="radio"
                  id="viewer"
                  name="accessLevel"
                  value={VIEWER}
                  onChange={handleChangeAccessLevel}
                />
                <span className="ml-2">Viewer</span>
              </div>
            </FormGroup>
            <div className="flex justify-end mt-auto gap-2">
              <Button type="submit" className="w-m-[100px] bg-primary">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Share wallet"
                )}
              </Button>
              <button
                onClick={closeModal}
                className="flex items-center justify-center p-4 text-base bg-secondary font-semibold rounded-xl text-white min-h-[56px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default WalletShare;
