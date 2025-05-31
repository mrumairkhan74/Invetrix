import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Background from "./Background";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const apiurl = import.meta.env.VITE_BACKEND_API;

const Update = ({user}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "pcs",
    expiry: "",
  });

  // Fetch existing item data when component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiurl}/item/get/${id}`, {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load item data");
        toast.error("Failed to load item data");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${apiurl}/item/update/${id}`, formData, {
        withCredentials: true,
      });
      toast.success("Item updated successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Background />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full min-h-screen bg-transparent relative">
        <div className="bg-transparent border-1 shadow-lg shadow-green-300 w-full max-w-[700px] h-auto mx-auto my-8 p-5 rounded-md relative top-0 left-0 transform-none md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <h1 className="px-5 m-3 text-center text-green-700 tracking-[4px] text-3xl font-mono mb-6 ">Update Items
          </h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-10">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-green-50 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 p-3 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-green-50 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 p-3 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full bg-green-50 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 p-3 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full bg-green-50 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 p-3 rounded-md"
              >
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="g">Grams</option>
                <option value="l">Liters</option>
                <option value="ml">Milliliters</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={formData.expiry?.split('T')[0] || ''}
                onChange={handleChange}
                className="w-full bg-green-50 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 p-3 rounded-md"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-300"
            >
              {loading ? "Updating..." : "Update Item"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;