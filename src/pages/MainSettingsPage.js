import React from "react";
import { useSelector } from "react-redux";
import { deleteApi } from "api/wallet/DeleteApi";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { edit } from "api/wallet/EditApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { shareWallet } from "api/WalletShareApi";
import { CO_OWNER, VIEWER } from "constants/variableConstants";
import { useForm } from "react-hook-form";
import FormGroup from "components/common/FormGroup";
import Label from "components/label/Label";
import Input from "components/input/Input";
import { jwtDecode } from "jwt-decode";

const MainSettingsPage = () => {
  const wallet = useSelector((state) => state.wallet.wallets);
  const selectedWalletId = useSelector((state) => state.wallet.wallets.id);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [accessLevel, setAccessLevel] = useState("co-owner");
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token);
  const [formState, setFormState] = useState({
    name: wallet.name,
    amount: wallet.amount,
    currentType: wallet.currentType,
    description: wallet.description,
  });
  
 function closeModal() {
   setIsOpen(false);
 }
  
const schema = yup.object().shape({
  shareEmail: yup
    .string()
    .email("Email must be in correct format")
    .required("Username is required"),
  accessLevel: yup.string(),
});

  useEffect(() => {
    setFormState({
      name: wallet.name,
      amount: wallet.amount,
      currentType: wallet.currentType,
      description: wallet.description,
    });
  }, [wallet]);

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdateWallet = async () => {
    try {
        const response = await edit(formState, wallet.id);
        if (response.status === 200) {
          toast.success("Wallet updated successfully");
        } else {
          toast.error("Failed to update wallet");
        }
    } catch (error) {
      toast.error("An error occurred while updating the wallet");
    }
  };

    const handleShareWallet = async (data) => {
      data.shareWalletId = selectedWalletId;
      console.log("Form data:", data);
      const response = await shareWallet(data);
      if (response.status === 201) {
        toast.success("Wallet shared successfully");
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        toast.error("Add new member failed");
      }
      console.log(response);
    };

     const handleChangeAccessLevel = (e) => {
       setAccessLevel(e.target.value);
     };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this wallet",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            deleteApi(wallet.id).then(() => {
              toast.success("Delete Successfully");
            });
            navigate("/wallet");
          },
          className:
            "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
        },
        {
          label: "Cancel",
          onClick: () => {},
          className:
            "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
        },
      ],
    });
  };

  return (
    <>
      <div>
        <div className="container px-4 py-8 mx-auto">
          <div className="mt-4">
            <div className="p-4 bg-white rounded-md shadow-md">
              <h2 className="text-lg font-bold">General information</h2>
              <div className="mt-2">
                <div className="flex justify-between">
                  <div className="w-1/4 px-2">
                    <label htmlFor="walletName" className="block text-gray-700">
                      Wallet Name
                    </label>
                    <input
                      type="text"
                      id="walletName"
                      name="name"
                      onChange={handleInputChange}
                      value={formState.name}
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/4 px-2">
                    <label
                      htmlFor="initialBalance"
                      className="block text-gray-700"
                    >
                      Initial Balance
                    </label>
                    <input
                      type="number"
                      id="initialBalance"
                      name="amount"
                      value={formState.amount}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/4 px-2">
                    <label
                      htmlFor="walletCurrency"
                      className="block text-gray-700 placeholder:USD"
                    >
                      Wallet currency
                    </label>
                    <input
                      type="text"
                      id="walletCurrency"
                      name="currentType"
                      value={formState.currentType}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/4 px-2">
                    <label
                      htmlFor="description"
                      className="block text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-md"
                  onClick={handleUpdateWallet}
                >
                  Update settings
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-bold">Wallet members</h2>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">
                      {decodedToken.sub}{" "}
                      <span className="text-yellow-700">(Owner)</span>
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(handleShareWallet)}>
                    <FormGroup>
                      <Label htmlFor="shareEmail">
                        Invitee's email address
                      </Label>
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
                    <button
                      type="submit"
                      className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      ) : (
                        "Add new member"
                      )}
                    </button>
                  </form>

                  <div className="flex items-center justify-end">
                    <span
                      className="text-red-500 cursor-pointer hover:underline"
                      onClick={() => handleDelete()}
                    >
                      Delete wallet
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainSettingsPage;