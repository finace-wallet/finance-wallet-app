import React, { useEffect, useState } from "react";
import Layout from "layout/main/Layout";
import { displayTransactionCategory } from "api/TransactionApi";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const TransactionCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactionCategories();
  }, []);

  const fetchTransactionCategories = async () => {
    try {
      const response = await displayTransactionCategory();
      if (response && response.status === 200) {
        setCategories(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transaction categories:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-60">
        <div className="relative w-5/6 mx-auto bg-white rounded-lg shadow md:w-5/6 lg:w-4/6 xl:w-3/6">
          <div className="mt-16">
            <div className="relative w-full">
              <div className="p-4 rounded-lg" style={{background: "linear-gradient(to right, #007BA7,   #AFEEEE)",}}>
                <h1 className="text-3xl font-bold text-center text-white">
                  Transaction Categories
                </h1>
              </div>
            </div>
            <div className="w-full mt-5">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <ul className="grid gap-4">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="relative transition duration-300 ease-in-out bg-white rounded-md shadow-md hover:shadow-lg"
                    >
                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-semibold">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Note: {category.note}
                        </p>
                      </div>
                      <div className="absolute flex items-center m-2 right-5 top-4">
                        <button className="text-gray-500 hover:text-gray-700">
                          <FaEdit size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block px-6 my-5">
            <Link
              to="/create-transaction-category"
              className="block px-6 py-3 font-medium leading-6 text-center text-gray-200 bg-gray-900 rounded-lg hover:bg-black hover:text-white"
            >
              Create category
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionCategoryPage;
