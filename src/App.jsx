import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Employer from "./employers/pages/Employer";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./auth/UserRegister";
import UserLogin from "./auth/UserLogin";
import UserForgotPassword from "./auth/UserForgotPassword";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/home" element={<AdminPage />} />
        <Route path="/user/home" element={ <Employer /> } />
        
        <Route path="/admin/login" element={ <AdminLogin /> } />
        <Route path="/admin/register" element={ <AdminRegister /> } />

        <Route path="/user/register" element={ <UserRegister /> } />
        <Route path="/user/login" element={ <UserLogin /> } />
        <Route path="/user/forgot-password" element={ <UserForgotPassword /> } />
       

      </Routes>
    </>
  );
};

export default App;
