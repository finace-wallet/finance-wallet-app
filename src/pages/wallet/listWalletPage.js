import React, { useEffect, useState } from "react";
import Layout from "layout/main/Layout";
import { listWallet } from "../../components/wallet/WalletApi";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setWalletDetails } from "store/wallet/walletSlice";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            setWallets(response.data.data.content);
            setTotalPages(response.data.data.totalPages || 0);
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
                <div className="w-full mx-auto my-60">
                    <div className="relative w-full mx-auto bg-white rounded-lg shadow md:w-5/6 lg:w-4/6 ">
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
                                <div className="flex flex-row items-center flex-grow w-full gap-4 mt-5 overflow-hidden text-sm ">
                                    {wallets && wallets.map((wallet) => (
            <div
            key={wallet.id}
            className="flex-grow w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 custom-card h-[150px]"
            onClick={() => {
        dispatch(setWalletDetails(wallet));
        console.log(wallet);
        navigate(`/wallet/${wallet.id}`);
          }}
        >
        
        <div className="items-center justify-between flex-grow">
        <div className="items-center flex-grow ">
          <FontAwesomeIcon icon={faWallet} style={{ color: '#99704A', fontSize: '24px' }} />
          <p className="text-lg text-black font">{wallet.name}</p>
        </div>
        <div className="text-gray-600 ">
          <p className="text-sm text-primary">{wallet.amount} {wallet.currentType}</p>
        </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Description: {wallet.description}</p>
        </div>
        
        ))}
    
                                </div>
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <ToastContainer />
    </>
    );
};

export default WalletList;
