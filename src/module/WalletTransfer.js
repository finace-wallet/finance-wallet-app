import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  displayWalletDetail,
  findShareWallet,
  transferWallet,
} from "api/WalletApi";
import { getAllWalletsByRecipientEmail } from "api/WalletTransfer";
import { Button, CloseButton } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setWalletDetails } from "store/wallet/walletSlice";
import * as yup from "yup";

const transferSchema = yup.object().shape({
  amount: yup.number().required("Share amount is required"),
  // .max(
  //   (schema) => schema.parent?.myWallet?.amount || 0,
  //   "Transfer amount cannot exceed your available balance."
  // ),
});

const WalletTransfer = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(transferSchema),
  });
  const myWallet = useSelector((state) => state.wallet.wallets);

  const recipientWallet = useSelector(
    (state) => state.wallet.walletsRecipiment
  );
  const recipimentEmail = useSelector(
    (state) => state.wallet.walletsRecipimentEmail
  );
  const dispatch = useDispatch();

  const handleTransferMoney = async (data) => {
    data.sourceWalletId = myWallet.id;
    data.destinationWalletId = recipientWallet.id;
    data.destinationEmail = recipimentEmail;
    console.log("Form Transfer Amount data:", data);
    const response = await transferWallet(data);
    console.log(response);
    toast.success("You have sent money");
    const update = await displayWalletDetail(myWallet.id);
    dispatch(setWalletDetails(update.data));
  };

  return (
    <>
      <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
        <p className="font-semibold">Sender: {myWallet.name}</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon="fa-solid fa-wallet" />
          <p className="text-gray-600">Amount: {myWallet.amount}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600">Currency Type: {myWallet.currentType}</p>
          <p className="text-gray-600">Description: {myWallet.description}</p>
        </div>
      </div>
      <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
        <p className="font-semibold">Reciever: {recipimentEmail}</p>
        <p className="">Reciever wallet name: {recipientWallet.name}</p>
      </div>
      <div className="flex flex-col justify-center p-4 max-w-3/4 mx-auto">
        <h2>Transfer Money</h2>

        {myWallet && (
          <form onSubmit={handleSubmit(handleTransferMoney)}>
            <FormGroup>
              <Label htmlFor="amount">Amount*</Label>
              <Input
                control={control}
                name="amount"
                type="number"
                min="0"
                className="bg-white w-full min-h-[35px] p-2"
              ></Input>
              <span className="text-sm text-red-500">
                {errors.amount?.message}
              </span>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description*</Label>
              <Input
                control={control}
                name="description"
                className="bg-white w-full min-h-[35px] p-2"
              ></Input>
              <span className="text-sm text-red-500">
                {errors.description?.message}
              </span>
            </FormGroup>
            <div className="flex justify-end mt-auto gap-2">
              <Button type="submit" className="w-m-[100px] bg-primary">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Transfer money"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default WalletTransfer;
