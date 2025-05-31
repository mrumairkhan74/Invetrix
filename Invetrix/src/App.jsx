import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { useState, useEffect } from "react";
import Update from "./pages/Update";
import Footer from "./components/Footer";
import InventoryTable from "./pages/InventoryTable";
import AddItems from "./pages/AddItems";
import PrivateRoute from "./components/PrivateRoute"; // 👈 Add this
import ExpiryTable from "./pages/ExpiryTable";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/update/:id"
            element={
              <PrivateRoute user={user}>
                <Update user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute user={user}>
                <InventoryTable user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute user={user}>
                <AddItems user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute user={user}>
                <AdminDashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/expired"
            element={
              <PrivateRoute user={user}>
                <ExpiryTable user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
