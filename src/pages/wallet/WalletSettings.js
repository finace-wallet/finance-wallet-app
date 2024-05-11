import LayoutWallet from "layout/wallet/LayoutWallet";
import React from "react";
import { useState } from "react";
import MainSettingsPage from "pages/MainSettingsPage";

const WalletSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState("main");

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
  };

  return (
    <>
      <LayoutWallet>
        <div className="flex w-full h-full sm:flex-row">
          <div className="mt-[58px] ml-40 bg-softGrey">
            <button
              onClick={() => handleSettingClick("main")}
              className={`block px-4 py-4 w-52 text-left font-bold rounded hover:bg-white ${
                selectedSetting === "main" ? "text-green-500 bg-white" : ""
              }`}
            >
              Main Settings
            </button>
            <button
              onClick={() => handleSettingClick("categories")}
              className={`block px-4 py-4 w-52 text-left font-bold rounded hover:bg-white ${
                selectedSetting === "categories"
                  ? "text-green-500 bg-white"
                  : ""
              }`}
            >
              Categories Settings
            </button>
          </div>

          <div className="mt-[10px] bg-softGrey">
            <>
              {selectedSetting === "main" && (
                <MainSettingsPage></MainSettingsPage>
              )}
              {selectedSetting === "categories" && <p>aaaaa</p>}
            </>
          </div>
        </div>
      </LayoutWallet>
    </>
  );
};

export default WalletSettings;
