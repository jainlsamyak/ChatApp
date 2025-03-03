import React, { useEffect } from "react";
import NavBar from "./components/Navbar.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage.jsx";
import "./index.css";
import { useAuthStore } from "./store/useAuthStore.js";
import { Home, Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme="lemonade">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/"></Navigate>}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/"></Navigate>}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login"></Navigate>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
