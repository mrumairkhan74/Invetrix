import axios from "axios";
import React, { useState, useEffect } from "react";
import Background from "./Background";
import Sidebar from "../components/Sidebar";

const apiurl = import.meta.env.VITE_BACKEND_API;

const ExpiryTable = ({user}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/item/get`);
      setItems(res.data);
    } catch {
      setError("Something went wrong fetching expiry items");
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const expiryThreshold = 3; // days
  const expiringItems = items.filter((item) => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);
    return diffDays <= expiryThreshold;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <p className="text-center py-6 text-red-600 font-semibold">{error}</p>
    );
  if (expiringItems.length === 0)
    return (
      <p className="text-center py-6 text-gray-600 font-medium">
        No items nearing expiry.
      </p>
    );

    return (
        <>
          <Background />
          <Sidebar user={user} />
      
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-center font-mono text-4xl tracking-widest font-bold text-gray-700 mb-8">
              Expired Items
            </h1>
      
            <div className="mb-6 flex justify-end">
              <button
                onClick={fetchItems}
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Refresh
              </button>
            </div>
      
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-300 bg-white">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-lg font-semibold text-blue-700 uppercase tracking-wide"
                    >
                      Sr#
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-lg font-semibold text-blue-700 uppercase tracking-wide"
                    >
                      Item Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-lg font-semibold text-blue-700 uppercase tracking-wide"
                    >
                      Expiry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-lg font-semibold text-blue-700 uppercase tracking-wide"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
      
                <tbody className="divide-y divide-gray-200">
                  {expiringItems.map((item, index) => {
                    const expiryDate = new Date(item.expiryDate);
                    const isExpired = expiryDate < now;
                    return (
                      <tr
                        key={item._id || index}
                        className="hover:bg-blue-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {expiryDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isExpired ? (
                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                              Near Expiry
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
      
};

export default ExpiryTable;
