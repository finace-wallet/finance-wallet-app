import React, { useEffect, useState } from "react";
import Layout from "layout/main/Layout";
import { listWallet } from "../../components/wallet/WalletApi";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setWalletDetails } from "store/wallet/walletSlice";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
const WalletList = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrenPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetchWallets();
    }, [currentPage]);

    const fetchWallets = async () => {
        try {
    const response = await listWallet(currentPage);
            setWallets(response.data.content);
            setTotalPages(response.data.totalPages || 0);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wallets:", error);
        }
    };
    
   const handleNextPage = ({ selected }) => {
        setCurrenPage(selected);
    };

    useEffect(()=>{
        console.log(totalPages);
    },[totalPages])

    return (
    <>
        <Layout>
                <div className="container mx-auto my-60">
                    <div className="relative w-5/6 mx-auto bg-white rounded-lg shadow md:w-5/6 lg:w-4/6 xl:w-3/6">
                        <div className="flex justify-center">
                            <img src="https://png.pngtree.com/png-clipart/20230423/original/pngtree-modern-finance-investment-logo-png-image_9077777.png" alt="" className="absolute w-32 h-32 mx-auto transition duration-200 transform border-4 border-white rounded-full shadow-md -top-20 hover:scale-110" />
                        </div>
        
                        <div className="mt-16">
                            <h1 className="text-3xl font-bold text-center text-gray-900">My Wallets</h1>
                            <p className="text-sm font-medium text-center text-gray-400">Information of wallet</p>
        
                            <div className="px-6 my-5">
                                <Link to="/create-wallet" className="block px-6 py-3 font-medium leading-6 text-center text-gray-200 bg-gray-900 rounded-lg hover:bg-black hover:text-white">Create wallet</Link>
                            </div>
                            <div className="w-full">
                                <h3 className="px-6 font-medium text-left text-gray-900">Recent activities</h3>
                                <div className="flex flex-col items-center w-full mt-5 overflow-hidden text-sm">
                                    {wallets && wallets.map((wallet) => (
            <div
            key={wallet.id}
            className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 custom-card"
            onClick={() => {
        dispatch(setWalletDetails(wallet));
        console.log(wallet);
        navigate(`/wallet/${wallet.id}`);
          }}
        >
        <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faWallet} className="mr-2 text-2xl text-primary" />
          <p className="text-lg font-semibold text-primary">{wallet.name}</p>
        </div>
        <div className="text-gray-600">
          <p className="text-sm">Amount: {wallet.amount}</p>
          <p className="text-sm">Currency Type: {wallet.currentType}</p>
        </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Description: {wallet.description}</p>
        </div>
        
        ))}
        <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'px-3 py-1'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleNextPage}
        containerClassName={'flex items-center justify-center my-5 '}
        pageClassName={'mx-1 px-3 py-1 border rounded-md'}
        activeClassName={'bg-blue-500 text-white'}
        previousClassName={'mx-1 px-3 py-1 border rounded-md'}
        nextClassName={'mx-1 px-3 py-1 border rounded-md'}
        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
    </>
    );
};

export default WalletList;
