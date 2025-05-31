import React, { useState } from "react";
import Background from "./Background";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

// backend api
const apiurl = import.meta.env.VITE_BACKEND_API;
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password) {
      return setError("Please Fill all Field");
    }
    try {
      const res = await axios.post(
        `${apiurl}/user/create`,
        { name, email, password },
        { withCredentials: true }
      );
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user.email && res.data.user.role)
      );
      toast.success(
        `👤 ${res.data.user.name} Register Successfully! Please Login`
      );
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/home");
        }
      }, 1500);
    } catch {
      setError("Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <ToastContainer position="top-right" />
      <div className="z-[3] relative w-full min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/20 border border-green-500 rounded-md backdrop-blur-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <img
              src="/images/icon.png"
              className="w-[80px] sm:w-[100px] mx-auto mb-4"
              alt="Logo"
            />
            <h1 className="text-center text-3xl sm:text-4xl tracking-wide font-mono text-green-700 mb-6">
              Register
            </h1>

            {error && (
              <p className="text-center text-red-600 mb-4 font-semibold">
                {error}
              </p>
            )}

            <input
              type="text"
              placeholder="Enter Name"
              className="w-full bg-green-200 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 mb-5 p-3 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full bg-green-200 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 mb-5 p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full bg-green-200 border-2 border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 mb-5 p-3 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoComplete="password"
            />
            <div className="flex gap-2 items-center m-5">
              I already have an account
              <Link to={"/"} className="text-green-700 text-lg">
                Login
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full bg-green-200 text-green-800 font-semibold py-3 rounded-md transition"
            >
              {loading ? <Loading /> : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
