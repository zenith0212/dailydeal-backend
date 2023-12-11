import React, { useState } from 'react';
import { GrRotateRight } from 'react-icons/gr';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { base_url } from '../../config/config';
import Modal from 'react-bootstrap/Modal';
import { RiAppleFill, RiCloseFill } from 'react-icons/ri';
import { CartButton, CommonLabel, HuntLabel16, Input, Label14, ProfileTitle, SocialButton, Title32 } from '../Store/StyledCom';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import ForgotPass from './ForgotPass';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';


function Verify(props) {

    const [code, setCode] = useState();

    const cookies = new Cookies();

    const onSubmit = async (e) => {
        e.preventDefault();
        const conf = {
            method: 'post',
            url: base_url + 'verify',
            data: {
                code: code
            }
        }
        await axios(conf).then((res) => {
            // console.log(res.data);
            localStorage.setItem('email', res.data.email)

            cookies.set('TOKEN', res.data.token, {
                path: "/",
                maxAge:7200
            });
            setCode('');
            // console.log(res.data);?
            window.location.href = '/';

        }).catch((error) => (
            console.log(error)
        ))
    }
    const handleReset = async () => {
        const conf = {
            method: 'get',
            url: base_url + 'verify',
        }
        await axios(conf).then((res) => {
            notification(res.data.message);
        }).catch((error) => (
            console.log(error)
        ));
    }
    return (
        <>
            <Modal show={props.showVerify} onHide={props.closeVerify}>
                <ToastContainer autoClose={2000} />
                <Modal.Body>
                    <div className='mx-auto px-4'>
                        <div className="d-flex justify-content-end">
                            <RiCloseFill size={25} onClick={props.closeVerify} />
                        </div>
                        <Title32>2-Step Verification</Title32>
                        <form noValidate autoComplete="off" onSubmit={onSubmit}>

                            <ProfileTitle className="ml-2 mt-5 mb-3">Enter a verification code</ProfileTitle>
                            <HuntLabel16 style={{ color: '#717171' }}>A verification code has been set to your email</HuntLabel16>
                            <HuntLabel16 style={{ color: '#89939E' }}>{props.email}</HuntLabel16>
                            <HuntLabel16 className='my-4' style={{ color: '#717171' }}>Enter the 6-Digit code</HuntLabel16>
                            <div style={{ height: 40 }}>
                                <Input type="text" onChange={(e) => setCode(e.target.value)} />
                            </div>


                            <div className='d-flex justify-content-between align-items-end my-2'>
                                <div className="d-flex align-items-center mt-3 gap-2">
                                    <input type='checkbox' />
                                    <Label14 className="m-0">Remember me for 15 Days</Label14>
                                </div>
                                <Label14 className='m-0 gap-2' style={{ color: '#355E3B', cursor: 'pointer' }} onClick={handleReset}><GrRotateRight />Resend Passcode</Label14>
                            </div>
                            <CartButton className='mt-4' type='submit'>Verify</CartButton>
                            <CartButton type='button' onClick={() => props.closeVerify()} className='mt-2 bg-transparent text-dark'>Cancel</CartButton>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Verify;