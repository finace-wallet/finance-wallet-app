import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { transferMoney } from "api/WalletApi"; // Import your transferMoney function
import { toast } from "react-toastify";

const TransferMoneyPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [wallets, setWallets] = useState([]); // Replace with actual wallet data
  const [selectedSourceWallet, setSelectedSourceWallet] = useState(null);
  const [selectedDestinationWallet, setSelectedDestinationWallet] =
    useState(null);
  const [destinationEmail, setDestinationEmail] = useState("");
  const [destinationWallets, setDestinationWallets] = useState([]);

  const handleFormSubmit = async (data) => {
    const transferMoneyRequest = {
      sourceWalletId: selectedSourceWallet,
      destinationWalletId: selectedDestinationWallet,
      destinationEmail: destinationEmail,
      amount: data.amount,
      description: data.description,
    };
    const response = await transferMoney(transferMoneyRequest);
    if (response && response.success) {
      toast.success("Money transferred successfully");
    } else {
      toast.error("Failed to transfer money. Please try again.");
    }
  };

  const handleSourceWalletChange = (event) => {
    setSelectedSourceWallet(event.target.value);
  };

  const handleDestinationEmailChange = (event) => {
    setDestinationEmail(event.target.value);
    // Call your API to get wallets of the destination user here
    // Then update 'destinationWallets' state
  };

  const handleDestinationWalletChange = (event) => {
    setSelectedDestinationWallet(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormGroup>
        <Label htmlFor="sourceWallet">Source Wallet *</Label>
        <select name="sourceWallet" onChange={handleSourceWalletChange}>
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="destinationEmail">Destination Email *</Label>
        <Input
          name="destinationEmail"
          type="email"
          placeholder="Enter destination email"
          onChange={handleDestinationEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="destinationWallet">Destination Wallet *</Label>
        <select
          name="destinationWallet"
          onChange={handleDestinationWalletChange}
        >
          {destinationWallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="amount">Amount *</Label>
        <Input
          control={control}
          name="amount"
          type="number"
          placeholder="Enter amount"
          error={errors.amount?.message}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <Input
          control={control}
          name="description"
          type="text"
          placeholder="Enter description"
          error={errors.description?.message}
        />
      </FormGroup>

      <Button type="submit">Transfer Money</Button>
    </form>
  );
};

export default TransferMoneyPage;
