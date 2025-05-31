import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Background from "./Background";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const apiurl = import.meta.env.VITE_BACKEND_API;

const InventoryTable = ({ user }) => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/item/get`, {
        withCredentials: true,
      });
      setItems(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch items";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${apiurl}/item/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Item deleted successfully");
      fetchItems();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete item";
      toast.error(errorMsg);
    }
  };

  const getCategoryDistribution = () => {
    const categoryMap = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryMap),
      datasets: [
        {
          label: "Quantity by Category",
          data: Object.values(categoryMap),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getExpiryStatus = () => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 30);

    const statusCounts = items.reduce(
      (acc, item) => {
        const expiry = new Date(item.expiryDate);
        if (expiry < now) acc.expired++;
        else if (expiry < soon) acc.expiringSoon++;
        else acc.valid++;
        return acc;
      },
      { expired: 0, expiringSoon: 0, valid: 0 }
    );

    return {
      labels: ["Expired", "Expiring Soon", "Valid"],
      datasets: [
        {
          label: "Expiry Status",
          data: Object.values(statusCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getTopItems = () => {
    const sorted = [...items]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      labels: sorted.map((item) => item.name),
      datasets: [
        {
          label: "Top Items by Quantity",
          data: sorted.map((item) => item.quantity),
          backgroundColor: "rgba(0, 153, 255, 0.7)",
          borderWidth: 6,
        },
      ],
    };
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Background />
      <Sidebar user={user}/>
      <div className=" md:ml-64 flex flex-col min-h-screen bg-gray-50">
        <h1 className="text-center text-5xl font-mono font-bold tracking-[3px] mt-10"> Inventory Details</h1>
        <main className="flex-1 p-4 md:p-6 m-5">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Inventory by Category
              </h3>
              <div className="h-64">
                <Pie
                  data={getCategoryDistribution()}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Expiry Status
              </h3>
              <div className="h-64">
                <Bar
                  data={getExpiryStatus()}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Top Items by Quantity
              </h3>
              <div className="h-64">
                <Line
                  data={getTopItems()}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-700">
                Inventory Items
              </h2>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {error}
              </div>
            )}

            {items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No inventory items found. Add some items to get started.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiry Date
                        </th>
                        {user?.role === "admin" && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.map((item, index) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.expiryDate
                              ? new Date(item.expiryDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                          {user?.role === "admin" && (
                            <td className="px-6 py-4 text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link
                                  to={`/update/${item._id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {items.length > itemsPerPage && (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstItem + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, items.length)}
                      </span>{" "}
                      of <span className="font-medium">{items.length}</span>{" "}
                      results
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default InventoryTable;
