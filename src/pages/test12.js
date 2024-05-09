import LayoutTwoColumn from "layout/LayoutTwoColumn";
import Layout from "layout/main/Layout";
import React, { useState } from "react";
import WalletList from "./wallet/listWalletPage";
import CategoriesPage from "./CategoriesPage";

const CategoriesSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState('main');

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
  }

  return (
    <>
      <Layout>
          <LayoutTwoColumn leftStyle="my-auto mt-10 flex flex-col justify-end">
            {{
              left: (
                <>
                  <div className="px-6 my-5">
                    <button
                      onClick={() => handleSettingClick("main")}
                      className="block px-4 py-2 font-bold rounded mx- hover:bg-green-700"
                    >
                      Main Settings
                    </button>
                    <button
                      onClick={() => handleSettingClick("categories")}
                      className="block px-4 py-2 font-bold rounded mx- hover:bg-green-700"
                    >
                      Categories Settings
                    </button>
                  </div>
                </>
              ),
              right: (
                <>
                  {selectedSetting === "main" && <WalletList></WalletList>}
                  {selectedSetting === "categories" && (
                    <CategoriesPage></CategoriesPage>
                  )}
                </>
              ),
            }}
          </LayoutTwoColumn>
      </Layout>
    </>
  );
};

export default CategoriesSettings;
