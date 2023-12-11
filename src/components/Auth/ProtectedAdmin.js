import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const PrivateAdmin = () => {

  const { admin_permission } = useCart();
  console.log("admin permission: ", admin_permission)
  return admin_permission ? <Outlet /> : <Navigate to="/" />;

}
export default PrivateAdmin;