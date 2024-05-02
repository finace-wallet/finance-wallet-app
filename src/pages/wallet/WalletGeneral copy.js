import { displayWallet } from "api/WalletApi";
import Pagination from "components/pagination/Pagination";
import LayoutTwoColumn from "layout/LayoutTwoColumn";
import Layout from "layout/main/Layout";
import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect, useState } from "react";

const WalletDetail = () => {
  const [wallets, setWallets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage]);

  const fetchWallets = async (page) => {
    try {
      const response = await displayWallet(page); // Function to fetch wallets from API
      console.log("This response", response);
      setWallets(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Layout>
        <UserSettingLayout>
          <LayoutTwoColumn>
            {{
              left: (
                <>
                  <p>This is the content for left panel</p>
                  <div className=" min-h-[500px]">
                    <h2>Wallets</h2>
                    {wallets.length > 0 ? (
                      <ul>
                        {wallets.map((wallet) => (
                          <li key={wallet.id}>
                            {wallet.name} - {wallet.amount} {wallet.currentType}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        No wallets created yet. Create a new wallet to get
                        started!
                      </p>
                    )}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ),
              right: (
                <>
                  <p>This is the content for right panel</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam amet, neque atque unde, autem veniam voluptate
                    tempore ipsam doloremque quis ratione, vitae molestias eos
                    perferendis nisi sed dicta quia? Ipsa!
                  </p>
                </>
              ),
            }}
          </LayoutTwoColumn>
        </UserSettingLayout>
      </Layout>
    </>
  );
};

export default WalletDetail;
