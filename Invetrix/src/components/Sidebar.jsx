import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcExpired } from "react-icons/fc";
import { FaOpencart } from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa";
import { IoStorefrontSharp, IoClose } from "react-icons/io5";
import { TbHomeQuestion } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed to top-left corner */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-white rounded-md shadow-lg"
      >
        {isOpen ? (
          <IoClose className="text-3xl text-green-700" />
        ) : (
          <HiMenu className="text-3xl text-green-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={` fixed top-0 left-0 w-64 md:w-72 min-h-screen shadow-lg shadow-green-500 rounded-md bg-white z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-col gap-5 h-full">
          <img
            src="./images/logo.png"
            className="m-5 w-48 md:w-64 animate-bounce"
            alt="Logo"
          />
          <nav className="m-5 p-5">
            <li className="list-none w-full mb-2">
              <Link
                to="/home"
                className="text-xl md:text-2xl tracking-[3px] md:tracking-[5px] font-mono text-green-700 p-3 md:p-4 rounded-md flex items-center gap-3 hover:bg-green-700 hover:text-white hover:skew-y-[-10deg] hover:skew-x-[-5deg] hover:shadow-md hover:shadow-green-500 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <TbHomeQuestion />
                Home
              </Link>
            </li>

            {/* Admin-only links */}
            {user?.role === "admin" && (
              <>
                <li className="list-none w-full mb-2">
                  <Link
                    to="/items"
                    className="text-[18px] md:text-1xl tracking-[3px] md:tracking-[5px] font-mono text-green-700 p-3 md:p-4 rounded-md flex items-center gap-3 hover:bg-green-700 hover:text-white hover:skew-y-[-10deg] hover:skew-x-[-5deg] hover:shadow-md hover:shadow-green-500 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaOpencart />
                    Add Items
                  </Link>
                </li>
                <li className="list-none w-full mb-2">
                  <Link
                    to="/inventory"
                    className="text-xl md:text-2xl tracking-[3px] md:tracking-[5px] font-mono text-green-700 p-3 md:p-4 rounded-md flex items-center gap-3 hover:bg-green-700 hover:text-white hover:skew-y-[-10deg] hover:skew-x-[-5deg] hover:shadow-md hover:shadow-green-500 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoStorefrontSharp />
                    Inventory
                  </Link>
                </li>
                <li className="list-none w-full mb-2">
                  <Link
                    to="/expired"
                    className="text-xl md:text-2xl tracking-[3px] md:tracking-[5px] font-mono text-green-700 p-3 md:p-4 rounded-md flex items-center gap-3 hover:bg-green-700 hover:text-white hover:skew-y-[-10deg] hover:skew-x-[-5deg] hover:shadow-md hover:shadow-green-500 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <FcExpired />
                    Expired
                  </Link>
                </li>
              </>
            )}

            {/* Regular user links */}
            {user?.role !== "admin" && (
              <li className="list-none w-full mb-2">
                <Link
                  to="/inventory"
                  className="text-xl md:text-2xl tracking-[3px] md:tracking-[5px] font-mono text-green-700 p-3 md:p-4 rounded-md flex items-center gap-3 hover:bg-green-700 hover:text-white hover:skew-y-[-10deg] hover:skew-x-[-5deg] hover:shadow-md hover:shadow-green-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <FaOpencart />
                  Items
                </Link>
              </li>
            )}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
