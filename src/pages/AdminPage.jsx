import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import MainContent from "../components/MainContent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        // if (!token) {
        //   navigate("/admin/login");
        // }
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      <div className="ds-app">
        <SideNav
          activeComponent={activeComponent}
          setActiveComponent={handleComponentChange}
          onToggle={handleSidebarToggle}
          data={data}
        />
        <MainContent
          activeComponent={activeComponent}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </>
  );
};

export default AdminPage;
