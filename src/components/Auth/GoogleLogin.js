import axios from 'axios';
import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { GoogleLogin } from 'react-google-login';
import { base_url } from '../../config/config';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';
import {gapi} from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const cookies = new Cookies();
function GoogleLoginButton() {
  // console.log('clientID', process.env.REACT_APP_GOOGLE_CLIENT_ID)
  const onSuccess = async (res) => {
    try {
      const result = await axios({
        method: 'post',
        url: base_url + 'googlelogin',
        data: { idToken: res.tokenId }
      });
      localStorage.setItem('email', result.data.user.email);
      // alert(result.data.user.email);
      cookies.set('TOKEN', result.data.token, {
        path: "/",
        maxAge:3600*2
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: clientId,
        plugin_name: "chat"
    })})

  return (

    <GoogleLogin
      clientId={clientId}
      buttonText="Sign up with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px' }}
      isSignedIn={false}
      className='w-100 h-100'
    />

  );
}

export default GoogleLoginButton;