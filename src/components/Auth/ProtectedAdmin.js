import React, {useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const PrivateAdmin = () => {

    const {admin_permission} = useCart();

  return admin_permission ? <Outlet /> : <Navigate to="/" />;

}
export default PrivateAdmin;