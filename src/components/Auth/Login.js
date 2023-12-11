import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { base_url } from '../../config/config';
import Modal from 'react-bootstrap/Modal';
import { RiAppleFill, RiCloseFill } from 'react-icons/ri';
import { CartButton, CommonLabel, Input, Label14, SocialButton, Title32 } from '../Store/StyledCom';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import ForgotPass from './ForgotPass';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import Verify from './Verify';
import GoogleLoginButton from './GoogleLogin';
import FaceLogin from './FacebookLogin';
import { useValidator } from '../Validation/LoginForm/useValidator';
import FacebookLogin from "react-facebook-login";
import { BsFacebook } from "react-icons/bs";

const PasswordInput = styled.div`
    position: relative;
    height: 40px;
`
const ShowIcon = styled.div`
    position: absolute;
    right: 2%;
    top: 20%;
    // transform: translateY(0%) translateX(-50%);
`
function Login(props) {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [show_pass, setShowPass] = useState(false);
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const cookies = new Cookies();
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [showVerify, setShowVerify] = useState(false);

    const closeVerify = () => setShowVerify(false);
    const closeForgotPass = () => setShowForgotPass(false);

    const {errors, validateForm, onBlurField} = useValidator(form);

    
    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
        console.log(nextFormState);
        if(errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
    };

    const handleForgotPass = () => {
        props.closeLogin();
        setShowForgotPass(!showForgotPass);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const {isValid} = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        const configuration = {
            method: 'post',
            url: base_url + 'login',
            data: {
                email: form.email,
                password: form.password,
            }
        };

        await axios(configuration)
            .then((result) => {
                if (result.data.tsv) {
                    props.closeLogin();
                    setShowVerify(true);
                } else {
                    localStorage.setItem('email', result.data.email);
                    cookies.set('TOKEN', result.data.token, {
                        path: "/",
                        maxAge: 7200
                    });
                    window.location.href = "/";
                }

            })
            .catch((error) => {
                notification(error.response.data.message);
            });
    }
    const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
    const responseFacebook = (response) => {
        console.log(response);
        setData(response);
        //setPicture(response.picture.data.url);
        if (response.accessToken) {
          
          setLogin(true);
          console.log(login)
        } else {
          setLogin(false);
        }
      };
    return (
        <>
            <Modal show={props.showLogin} onHide={props.closeLogin}>
                <ToastContainer autoClose={2000} />
                <Modal.Body>
                    <div className='mx-auto px-4'>
                        <div className="d-flex justify-content-end">
                            <RiCloseFill size={25} onClick={props.closeLogin} />
                        </div>
                        <Title32>Sign in to DailyDeal</Title32>
                        <form noValidate autoComplete="off" onSubmit={onSubmit}>

                            <CommonLabel className="my-2">Email Address</CommonLabel>
                            <div style={{ height: 40 }}>
                                <Input type="email" name="email" value={form.email} onChange={onUpdateField} onBlur={onBlurField} />
                            </div>

                            {errors.email.dirty && errors.email.error?(
                                <p className="text-danger">{errors.email.message}</p>
                            ):null}

                            <CommonLabel className="my-2">Password</CommonLabel>
                            <PasswordInput>
                                <Input type={show_pass ? 'text' : 'password'} name="password" value={form.password} onChange={onUpdateField} onBlur={onBlurField}/>
                                <ShowIcon>
                                    {
                                        show_pass ?
                                            <AiOutlineEyeInvisible size={25} onClick={() => setShowPass(!show_pass)} />
                                            :
                                            <AiOutlineEye size={25} onClick={() => setShowPass(!show_pass)} />
                                    }
                                </ShowIcon>
                            </PasswordInput>
                            {errors.password.dirty && errors.password.error?(
                                <p className="text-danger">{errors.password.message}</p>
                            ):null}
                            <div className='d-flex justify-content-between align-items-end'>
                                <div className="d-flex align-items-center mt-3 gap-2">
                                    <input type='checkbox' />
                                    <Label14 className="m-0">Remember me for 30 Days</Label14>
                                </div>
                                <Label14 className='m-0' style={{ color: '#355E3B' }} onClick={handleForgotPass}>Forgot Password?</Label14>
                            </div>
                            <CartButton type='submit' className='mt-4'>Sign In</CartButton>
                        </form>

                        <div className="row">
                            <div className='d-flex my-2'>
                                <hr style={{ width: '45%', opacity: 1 }} /><Label14 className="m-0 d-flex align-items-center px-4">OR</Label14><hr style={{ width: '45%', opacity: 1 }} />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <GoogleLoginButton />
                                {/* <SocialButton><FcGoogle size={25} />Sign up with Google</SocialButton> */}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                {/* <SocialButton><RiAppleFill size={25} />Sign up with Apple</SocialButton> */}
                                <FaceLogin/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ForgotPass showForgotPass={showForgotPass} closeForgotPass={closeForgotPass} />
            <Verify showVerify={showVerify} closeVerify={closeVerify} email={form.email} />
        </>
    )
}
export default Login;