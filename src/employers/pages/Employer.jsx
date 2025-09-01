import React, { useState,useEffect } from 'react';
import SideNav from '../components/SideNav';
import MainContent from '../components/MainContent';
import './Employer.css';
import api from '../../api';

function Employer() {
  const [data,setData] = useState([])
  const [activeComponent, setActiveComponent] = useState('AddNewRecord');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const [username,setUsername] = useState(null)

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token){
                  navigate('/user/login')
                }
                const response = await api.get('/api/users/me/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('User data:', response.data);
                const {first_name,last_name,email} = response.data
                setData(response.data)
                setUsername(first_name + " " + last_name)

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);



  return (
    <div className="user-app">
      <SideNav 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        onToggle={handleSidebarToggle}
        username={username}
      />
      <MainContent 
        activeComponent={activeComponent}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}

export default Employer;