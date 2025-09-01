import React, { useEffect } from 'react'
import api from '../api'

const AllUsers = () => {
    const fetchData = async () => {
        try {
            const res = await api.get("/api/candidates/employee-performance/");
            console.log('all-user : ',res.data);
            
        } catch (error) {
            console.error(error);
            
        }
    }
    useEffect(() => {
        fetchData();
    },[])
  return (
    <div>AllUsers</div>
  )
}

export default AllUsers;