import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileTitle, ProfileLabel, Input, SaveButton, CancelButton, HuntLabel16, Label14, CommonLabel } from '../Store/StyledCom';
import Switch from "react-switch";
import axios from 'axios';
import { base_url } from '../../config/config';
import formatDate from '../common/FormatDate';
import { ToastContainer } from 'react-toastify';
import { notification } from '../../actions/notificantion';
import { DatePicker } from 'rsuite';
import Cookies from 'universal-cookie';
import { getUserInfo } from '../api/profileInfo';
const cookies = new Cookies();

const token = cookies.get('TOKEN');

function PersonalInformation() {
    const location = useLocation();
    const [twoFactor, setTwoFactor] = useState(true);
    const [verifyEmail, setVerifyEmail] = useState(true);
    const [verifySMS, setVerifySMS] = useState(false);
    const [currentPass, setCurrentPass] = useState();
    const [newPass, setNewPass] = useState();
    const [rePass, setRePass] = useState();
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", phoneNumber: "", });

    const passRef = useRef(null);
    useEffect(() => {
        async function fetchUserInfo() {
            setUserInfo(await getUserInfo());
            // console.log(await getUserInfo());
        }
        fetchUserInfo();
        if (location.state.position === "password") {
            passRef.current.scrollIntoView()
        }

    }, []);

    const handleTwoFactor = () => {
        setTwoFactor(true);
        setVerifyEmail(true);
    }
    const setTSV = async (status) => {
        const conf = {
            method: 'put',
            url: base_url + 'login',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                email: localStorage.getItem('email'),
                tsv: status
            }
        }
        await axios(conf).then((result) => {
            // notification(result.data.result.twostepverify);
            // console.log(result.data.result.twostepverify);
        })
    }

    const handleEmail = () => {
        setUserInfo({ ...userInfo, verifyEmail: !userInfo.verifyEmail });
        setTSV(!userInfo.verifyEmail);
    }
    const handleSMS = () => {
        setVerifySMS(!verifySMS);
    }

    const saveUserInfo = () => {
        const config = {
            method: 'put',
            url: base_url + 'profile/saveuserinfo',
            data: {
                email: localStorage.getItem('email'),
                first_name: userInfo.firstName,
                last_name: userInfo.lastName,
                phone_number: userInfo.phoneNumber,
                birthday: userInfo.birthday
            }
        }
        axios(config)
            .then((result) => {
                notification(result.data.message)
            })
            .catch((error) => {
                notification(error)
            })
    }
    const changeEmail = () => {
        if (userInfo.email == localStorage.getItem('email')) {
            notification('Same email')
        }
        else {

            const config = {
                method: 'post',
                url: base_url + 'editemail',
                data: {
                    email: localStorage.getItem('email'),
                    new_email: userInfo.email
                }
            }
            axios(config)
                .then((result) => {
                    notification(result.data.message);
                    localStorage.setItem('email', userInfo.email)
                })
        }
    }

    const changePassword = () => {

        if (newPass === rePass) {
            const config = {
                method: 'post',
                url: base_url + 'changepassword',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    email: localStorage.getItem('email'),
                    password: currentPass,
                    new_password: newPass
                }
            }

            axios(config)
                .then((result) => {
                    notification(result.data.message);
                })
        }
        else {
            notification('Password does not match')
        }
    }
    return (
        <div className='col-sm-9'>
            <ToastContainer autoClose={2000} />
            <div className='my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>User Information</ProfileTitle>
                <div className='px-4 py-2'>
                    <ProfileLabel>*Required fields</ProfileLabel>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>First Name *</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="text" name="firstName" onChange={e => setUserInfo({ ...userInfo, firstName: e.target.value })} value={userInfo.firstName} />
                            </div>
                            <ProfileLabel className='mt-4 mb-0'>Contact Number *</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="text" name="contactNumber" onChange={e => setUserInfo({ ...userInfo, phoneNumber: e.target.value })} value={userInfo.phoneNumber} />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Last Name *</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="text" name="lastName" onChange={e => setUserInfo({ ...userInfo, lastName: e.target.value })} value={userInfo.lastName} />
                            </div>
                            <ProfileLabel className='mt-4 mb-0'>Date of Birth</ProfileLabel>

                            {/* <Input type="date" name="birthday" onChange={e => setBirthday(e.target.value)} value={formatDate(birthday)} /> */}
                            <DatePicker block size='lg' placeholder={formatDate(userInfo.birthday)} onChange={e => setUserInfo({ birthday: e.toISOString().slice(0, 10) })} />

                        </div>
                        <div className='col-12 col-md-2'>
                            <HuntLabel16 className='mx-0 my-4 justify-content-center' onClick={() => saveUserInfo()} style={{ background: '#F2F7F2', padding: '14px 30px' }}>Save</HuntLabel16>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3' style={{ background: '#fff' }} ref={passRef}>
                <ProfileTitle className='border-bottom p-3'>Password</ProfileTitle>
                <div className='px-4 py-2'>
                    <ProfileLabel>To change your password, verify your current password, then create a new password that you don’t use elsewhere. Change your password anytime you think it might have been compromised. For simple and secure sign-in, try the Adobe Account Access app to sign in without passwords.</ProfileLabel>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Current Password</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="password" name="currentPassword" onChange={e => setCurrentPass(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Type your new password*</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="password" name="newPassword" onChange={e => setNewPass(e.target.value)} />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Retype your new password</ProfileLabel>
                            <div style={{ height: 45 }}>
                                <Input type="password" name="rePassword" onChange={e => setRePass(e.target.value)} />
                            </div>
                        </div>
                        <div className='col-12 col-md-2'>
                            <HuntLabel16 className='mx-0 my-4 justify-content-center' onClick={changePassword} style={{ background: '#F2F7F2', padding: '14px 20px' }}>Change</HuntLabel16>
                        </div>
                    </div>
                </div>
            </div >

            <div className='my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Two-step verification</ProfileTitle>
                <div className='px-4 py-2 align-items-center' style={{ display: twoFactor ? 'none' : 'flex', height: 250 }}>
                    <div className='d-grid w-50 m-auto'>
                        <Label14 className='m-auto mb-3'><strong>Two-factor authentication is not enabled yet.</strong></Label14>
                        <Label14 className='text-center'>Two-factor authentication adds extra layer of security to your account by requiring more than just a password to log i.</Label14>
                        <HuntLabel16 onClick={handleTwoFactor} className='m-auto mt-2' style={{ background: '#F2F7F2', padding: '10px 15px', width: 'fit-content' }}>Enable Two-Factor Authentication</HuntLabel16>
                    </div>
                </div>
                <div className='px-4 py-2 align-items-center' style={{ display: twoFactor ? 'block' : 'none' }}>
                    <Label14 className='p-3'>Two-factor authentication adds extra layer of security to your account by requiring  more than just a password to log i. </Label14>
                    <div className='row p-2 border-bottom'>
                        <CommonLabel className='m-0 col-12 col-md-4 my-2'>Verify with email</CommonLabel>
                        <CommonLabel className='m-0 col-8 col-md-4' style={{ color: '#000' }}>{userInfo.email}</CommonLabel>
                        <div className='d-flex col-4 col-md-4 gap-3'>
                            <Switch onChange={handleEmail} onColor='#355E3B' checked={!!userInfo.verifyEmail ? true : false} />
                            <CommonLabel className='m-0'>{userInfo.verifyEmail ? 'ON' : 'Off'}</CommonLabel>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <CommonLabel className='m-0 col-12 col-md-4 my-2'>Verify with text messages (SMS)</CommonLabel>
                        <CommonLabel className='m-0 col-8 col-md-4' style={{ color: '#000' }}>+{userInfo.phoneNumber}</CommonLabel>
                        <div className='d-flex col-4 col-md-4 gap-3'>
                            <Switch onChange={handleSMS} onColor='#355E3B' checked={verifySMS} />
                            <CommonLabel className='m-0'>{verifySMS ? 'ON' : 'Off'}</CommonLabel>
                        </div>
                    </div>
                </div>
            </div >
            <div className='my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Email</ProfileTitle>
                <div className='px-4 py-2 row'>
                    <div className='col-12 col-md-6'>
                        <ProfileLabel>Email Address</ProfileLabel>
                        <div style={{ height: 45 }}>
                            <Input type='email' name="email" onChange={e => { setUserInfo({ ...userInfo, email: e.target.value }) }} value={userInfo.email} />
                        </div>
                    </div>
                </div>
                <div className='px-4 row'>
                    <div className="col-12 col-md-2">
                        <HuntLabel16 onClick={changeEmail} className='mx-0 my-4 justify-content-center' style={{ background: '#F2F7F2', padding: '10px 20px' }}>Change</HuntLabel16>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default PersonalInformation;