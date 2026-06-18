import Navbar from '@/components/Navbar';
import useAuth from '@/services/store';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UserLayout = () => {
    const authStatus = useAuth(
    (state) => state.authStatus
  );

  if (!authStatus) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
  
}

export default UserLayout