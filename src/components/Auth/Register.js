import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { RiCloseFill, RiAppleFill } from 'react-icons/ri';
import styled from "styled-components";
import axios from 'axios';
import Cookies from 'universal-cookie';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { base_url } from "../../config/config";
import Modal from 'react-bootstrap/Modal';
import { Label14, LinkH, Title32, SocialButton, CommonLabel, Input, CartButton } from "../Store/StyledCom";
import Verify from "./Verify";
import GoogleLoginButton from "./GoogleLogin";
import FaceLogin from "./FacebookLogin";
import { useValidator } from "../Validation/Signup/useValidator";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const RegisterBody = styled(Modal.Body)`
    padding:0!important;
`
const Register = (props) => {

    const cookies = new Cookies();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });

    const [phoneNumber, setPhoneNumber] = useState();
    const [showVerify, setShowVerify] = useState(false);

    const closeVerify = () => setShowVerify(false);
    const navigate = useNavigate();

    const { errors, validateForm, onBlurField } = useValidator(form);

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
        if (errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            })
    }

    const onSubmit = async (event) => {
        // console.log(phoneNumber);
        // const isValid = await form.validate(event);
        event.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        const configuration = {
            method: 'post',
            url: base_url + 'register',
            data: {
                first_name: form.firstName,
                last_name: form.lastName,
                phone_number: form.phoneNumber,
                email: form.email,
                password: form.password,
            }
        };


        axios(configuration)
            .then((result) => {
                props.closeRegister();
                setShowVerify(true);
            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    };

    return (
        <>
            <Modal
                show={props.showRegister}
                onHide={props.closeRegister}
                className='register'
                centered
            >
                <RegisterBody >
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={onSubmit}
                    >
                        <div className='row'>
                            <div className='col-sm-5 desktop_version'>
                                <LazyLoadImage src='/images/back_how.png' alt='Signup_image' className="mw-100 h-100 rounded-start" />
                            </div>

                            <div className='col-sm-7 mx-auto p-4'>
                                <div className="d-flex justify-content-end">
                                    <RiCloseFill size={25} onClick={props.closeRegister} />
                                </div>
                                <div className="p-2">
                                    <div className="d-flex justify-content-between my-3">
                                        <Title32>Create an Account </Title32>
                                        <div className="desktop_version">
                                            <div className="d-flex gap-1 align-items-end">
                                                <Label14>Already have an account?</Label14>
                                                <Label14 style={{ color: '#355E3B' }}>Sign in</Label14>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6 my-2">
                                            {/* <SocialButton><FcGoogle size={25} />Sign up with Google</SocialButton> */}
                                            <GoogleLoginButton />
                                        </div>
                                        <div className="col-12 col-md-6 my-2">
                                            {/* <SocialButton><RiAppleFill size={25} />Sign up with Apple</SocialButton> */}
                                            <FaceLogin />
                                        </div>
                                        <div className='d-flex my-2'>
                                            <hr style={{ width: '45%' }} /><Label14 className="m-0 d-flex align-items-center px-4">OR</Label14><hr style={{ width: '45%' }} />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">First Name</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <Input type="text" name="firstName" value={form.firstName} onBlur={onBlurField} onChange={onUpdateField} />
                                            </div>
                                            {errors.firstName.dirty && errors.firstName.error ? (
                                                <p className="text-danger">{errors.firstName.message}</p>
                                            ) : null}
                                        </div>
                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">Last Name</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <Input type="text" name="lastName" value={form.lastName} onBlur={onBlurField} onChange={onUpdateField} />
                                            </div>
                                            {errors.lastName.dirty && errors.lastName.error ? (
                                                <p className="text-danger">{errors.lastName.message}</p>
                                            ) : null}
                                        </div>
                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">Email</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <Input type="email" name="email" value={form.email} onBlur={onBlurField} onChange={onUpdateField} />
                                            </div>
                                            {errors.email.dirty && errors.email.error ? (
                                                <p className="text-danger">{errors.email.message}</p>
                                            ) : null}
                                        </div>
                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">Phone Number</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <PhoneInput
                                                    className='h-100'
                                                    country={'us'}
                                                    value={phoneNumber}
                                                    onChange={(e)=>setPhoneNumber(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">Password</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <Input type='password' name="password" value={form.password} onChange={onUpdateField} onBlur={onBlurField} />
                                            </div>
                                            {errors.password.dirty && errors.password.error ? (
                                                <p className="text-danger">{errors.password.message}</p>
                                            ) : null}
                                        </div>
                                        <div className='col-12 col-md-6 my-2'>
                                            <CommonLabel className="my-2">Re-Password</CommonLabel>
                                            <div style={{ height: 40 }}>
                                                <Input type='password' name="confirmPassword" value={form.confirmPassword} onChange={onUpdateField} onBlur={onBlurField} />
                                            </div>
                                            {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                                                <p className="text-danger">{errors.confirmPassword.message}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-3 gap-2">
                                        <input type='checkbox' />
                                        <Label14 className="m-0" style={{ fontWeight: 400, textAlign: 'left' }}>Share my registration data with our content providers for marketing purposes.</Label14>
                                    </div>
                                    <CartButton className="my-2">Sign up</CartButton>

                                    <Label14 style={{ display: 'inline' }}>By signing up, you agree to the <Link to='/terms'>Terms of Service</Link> and <Link to='/policy'>Privacy Policy</Link>, including <Link to='cookies'>cookie use</Link>.</Label14>

                                </div>
                            </div>
                        </div>
                    </form>
                </RegisterBody>
            </Modal >
            <Verify showVerify={showVerify} closeVerify={closeVerify} />
        </>
    );
};

export default Register;
