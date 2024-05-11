import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getAllWalletsByRecipientEmail } from "api/WalletTransfer";
import Modal from "react-modal";
import { Button, CloseButton } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setWalletRecipiment,
  setWalletRecipimentEmail,
} from "store/wallet/walletSlice";
import { useNavigate } from "react-router";

const emailSchema = yup.object().shape({
  transferEmail: yup
    .string()
    .email("Email must be in correct format")
    .required("Username is required"),
});

const WalletTransferEmail = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [mail, setMail] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination (default to 1)
  const [totalPages, setTotalPages] = useState(0); // Total number of pages (initially unknown)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setWallets([]); // Clear wallets when closing modal
    setCurrentPage(1); // Reset current page to 1
    setTotalPages(0); // Reset total pages
  }

  const handleCheckEmail = async (data) => {
    data.page = currentPage;

    const response = await getAllWalletsByRecipientEmail(data); // Assuming pagination in the API call

    setMail(data.transferEmail);
    setWallets(response.data.content);
    setTotalPages(response.data.totalPages || 0);
  };

  const handleNextPage = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="flex flex-col justify-center p-4 max-w-[200px] mx-auto">
        <button
          className=" justify-center text-base bg-blue-500 hover:bg-blue-700 font-semibold rounded-xl text-white min-h-[56px] mx-auto max-w-[200px] min-w-[200px]"
          onClick={openModal}
        >
          Share Money
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
              width: 600,
              height: 600,
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
          <CloseButton onClick={closeModal}></CloseButton>
          <h2>Share Wallet</h2>
          <p>Enter the recipient details here.</p>
          <form onSubmit={handleSubmit(handleCheckEmail)}>
            <FormGroup>
              <Label htmlFor="transferEmail">Email Reciepment*</Label>
              <Input
                control={control}
                name="transferEmail"
                type="text"
                min="0"
                error={errors.transferEmail?.message}
              ></Input>
            </FormGroup>
            <div className="flex justify-end mt-auto gap-2">
              <Button
                type="submit"
                className="w-m-[100px] bg-blue-500 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Check Email"
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
          <div className="flex flex-col items-center w-full mt-5 overflow-hidden text-sm">
            {wallets &&
              wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 custom-card"
                  onClick={() => {
                    dispatch(setWalletRecipiment(wallet));
                    dispatch(setWalletRecipimentEmail(mail));
                    navigate("/transfer-money");
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faWallet}
                        className="mr-2 text-2xl text-primary"
                      />
                      <p className="text-lg font-semibold text-primary">
                        {wallet.name}
                      </p>
                    </div>
                    <div className="text-gray-600">
                      <p className="text-sm">Amount: {wallet.amount}</p>
                      <p className="text-sm">
                        Currency Type: {wallet.currentType}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Description: {wallet.description}
                  </p>
                </div>
              ))}
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"px-3 py-1"}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handleNextPage}
              containerClassName={"flex items-center justify-center my-5 "}
              pageClassName={"mx-1 px-3 py-1 border rounded-md"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={"mx-1 px-3 py-1 border rounded-md"}
              nextClassName={"mx-1 px-3 py-1 border rounded-md"}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WalletTransferEmail;
