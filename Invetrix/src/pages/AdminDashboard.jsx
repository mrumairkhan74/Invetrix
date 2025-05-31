import React, { useEffect, useState } from "react";
import Background from "./Background";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InventoryTable from "../pages/InventoryTable";
import axios from "axios";
import Inventory from "./Inventory";

const apiurl = import.meta.env.VITE_BACKEND_API; // Your API base URL

const AdminDashboard = ({ user }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [expiryAlerts, setExpiryAlerts] = useState([]);

  useEffect(() => {
    // Fetch inventory items from backend
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`${apiurl}/item/get`); // Adjust API path as needed
        setInventoryItems(res.data);
        checkExpiry(res.data);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      }
    };

    const checkExpiry = (items) => {
      const now = new Date();
      const alerts = items.filter((item) => {
        if (!item.expiryDate) return false;
        const expiryDate = new Date(item.expiryDate);
        // Check if expired or expiring within 3 days
        const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);
        return diffDays <= 3;
      });
      setExpiryAlerts(alerts);
    };

    fetchInventory();
  }, []);
  useEffect(() => {
    if (expiryAlerts.length > 0) {
      const timer = setTimeout(() => {
        setExpiryAlerts([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [expiryAlerts]);

  return (
    <>
      <Background />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="md:static md:w-72 flex-shrink-0 right-0">
          <Sidebar user={user} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={user} className="sticky left-[100px] top-0 z-10" />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 w-full">
            <div className="max-w-10xl mx-auto space-y-6">
              {/* Expiry Alerts  */}
              {user.role === "admin" && expiryAlerts.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">Expiry Alert!</strong>
                  <ul className="mt-2 list-disc list-inside">
                    {expiryAlerts.map((item) => (
                      <li key={item.id}>
                        {item.itemName}{" "}
                        <span className="font-semibold">
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </span>{" "}
                        is{" "}
                        {new Date(item.expiryDate) < new Date()
                          ? "expired"
                          : "near expiry"}
                        .
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dashboard overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Dashboard Overview
                </h1>
                <p className="mt-2 text-gray-600">
                  Welcome back, {user?.name || "Admin"}!
                </p>
              </div>

              {/* Inventory Table */}
              <Inventory />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
