import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const apiurl = import.meta.env.VITE_BACKEND_API;

const Header = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${apiurl}/user/logout`);
      toast.success("Logout Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch {
      setError("Something went wrong");
      toast.error("Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <header className="w-full bg-white shadow-sm px-4 py-3 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 sticky top-0 z-20">
        {/* Left section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide flex items-center gap-2">
            Hello! <span className="text-green-600">👤 {user?.name}</span>
          </h1>
          <div className="flex items-center gap-2 sm:ml-4">
            <span className="text-sm uppercase bg-green-500 text-white px-3 py-1 rounded-md md:text-base font-medium tracking-wide">
              {user?.role}
            </span>
            <div className="relative">
              <GoDotFill className="text-green-500 animate-ping absolute opacity-75" />
              <GoDotFill className="text-green-600 relative" />
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-md self-end md:self-auto"
          onClick={handleLogout}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </header>
    </>
  );
};

export default Header;
