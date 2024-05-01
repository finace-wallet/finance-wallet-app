import Layout from "layout/main/Layout";
import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WalletDetail = () => {
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  const selectId = useSelector((state) => state.wallet.walletId);
  const selectName = useSelector((state) => state.wallet);
  console.log("🚀 ~ WalletDetail ~ selectId:", selectId);

  return (
    <>
      <Layout>
        <UserSettingLayout>Current Wallet:{selectId}</UserSettingLayout>
      </Layout>
    </>
  );
};

export default WalletDetail;
