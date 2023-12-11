import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import {refreshTokenSetup} from '../../utils/refreshToken';
import axios from 'axios';
import {BsFacebook} from 'react-icons/bs';
import Cookies from 'universal-cookie';
import { base_url } from '../../config/config';

const cookies = new Cookies();
function FaceLogin() {
    const responseFacebook = async(user) => {
        console.group("facebooklogin")
        console.log(user);
        try {
            const result = await axios({
                method: 'post',
                url: base_url + 'facebooklogin',
                data: {
                    user
                }
            });
            localStorage.setItem('email', result.data.user.email);
            console.log(result);
            console.groupEnd();
            // alert(result.data.user.email);
            cookies.set('TOKEN', result.data.token, {
                path: "/",
                maxAge: 3600 *2
            });
            window.location.href = "/";
        } catch (error) {
            console.log(error);
            console.groupEnd();
        }
        // refreshTokenSetup(res);
    }

    return (
        <div>
            <FacebookLogin
                appId="1084345225928626"
                fields="name,email,picture"
                callback={responseFacebook}
                icon=
                {<BsFacebook size={25
        } />}/>
        </div>
    )
}
export default FaceLogin;
// appId="185202659227880"