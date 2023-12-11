import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from "universal-cookie";
import Login from './Login';
const cookies = new Cookies();

const PrivateRoute = () => {

  const token = cookies.get("TOKEN");
  const [showLogin, setShowLogin] = useState(true);
  const closeLogin = () => setShowLogin(false);

  return token ? <Outlet /> : <Login showLogin={showLogin} closeLogin = {closeLogin} />;

}
export default PrivateRoute;