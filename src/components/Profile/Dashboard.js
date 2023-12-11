import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Td, Th, ProfileTitle, HuntLabel16, SubscribeInput, SubscribeButton } from '../Store/StyledCom';
import { FileUploader } from "react-drag-drop-files";
import Table from 'react-bootstrap/Table';
import { IoMdAdd } from 'react-icons/io';
import { getAddressInfo, getUserInfo } from '../api/profileInfo';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config/config';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import ProgressBar from 'react-bootstrap/ProgressBar';


const ProfileImage = styled.img`
    clip-path: circle();
    width: 70%;
    margin:auto;
    height: 130px;
`
const Label16 = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    &.active{
        background: #F2F7F2;
        border-left: 2px solid #355E3B;
    }
    padding:14.5px;
    margin: 5px;
    color: #355E3B;
`

const fileTypes = ["JPEG", "PNG", "GIF"];
function Dashboard() {
    const [file, setFile] = useState();
    const [filePath, setFilePath] = useState('/images/default_user.png');
    const [percent, setPercent] = useState(0);
    const [upload, setUpload] = useState(false);

    const handleChange = async (file) => {
        // setFile(file);
        setUserInfo({ ...userInfo, avatar: '' });
        setFilePath(URL.createObjectURL(file[0]));
        // console.log(file);
        var fd = new FormData();
        fd.append('file', file[0]);
        fd.append('email', localStorage.getItem('email'));
        setUpload(true);

        await axios.post(base_url + 'user-profile', fd, {
            onUploadProgress: (progressEvent) => {
                const progress = ((progressEvent.loaded / progressEvent.total) * 50).toFixed(0);
                setPercent(progress);
            },
            onDownloadProgress: (progressEvent) => {
                const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                setPercent(progress);
            }
        })
            .then((res) => {
                // setUpload(false);
                notification(res.data.message);
                
            }).catch((e) => {
                console.log(e);
            })
    };
    const [address, setAddress] = useState({ billAddress: "", shipAddress: "" });
    const [userInfo, setUserInfo] = useState({ firstName: "" });

    useEffect(() => {

        async function fetch() {
            setAddress(await getAddressInfo());
            setUserInfo(await getUserInfo());
            // await axios({method:'get'})
        }
        fetch();

    }, []);

    return (
        <div className='col-sm-9'>
            <ToastContainer autoClose={2000} />
            <div className='row my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Profile Picture</ProfileTitle>
                <div className='col-sm-3 p-3 d-grid '>
                    <Label16 style={{ margin: 'auto' }}>Profile picture</Label16>
                    <ProfileImage src={userInfo.avatar ? userInfo.avatar : filePath} alt='profilepicture' />
                </div>
                <div className='col-sm-7 text-center my-auto d-grid'>
                    <Label16 style={{ margin: 'auto' }}>Upload New Profile Picture</Label16>
                    <div className="d-flex justify-content-center">
                        <div>
                            <FileUploader
                                multiple={true}
                                onSelect={handleChange}
                                name="file"
                                types={fileTypes} />
                            {
                                upload ?
                                    <ProgressBar now={percent} label={`${percent}%`} />
                                    :
                                    <></>
                            }
                            {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
                        </div>
                        {/* <input type="file" onChange={(e) => console.log(e.target.files)} /> */}
                        {/* {console.log(URL.createObjectURL(file[0]))} */}
                    </div>
                </div>
            </div>
            <div className='row my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Account Information</ProfileTitle>
                <div className='col-sm-5'>
                    <Label16 className='m-0 mb-2'>Contact Information</Label16>

                    <div style={{ height: 70 }}>
                        <Label16 className='my-0 py-1'>{userInfo.firstName + " " + userInfo.lastName}</Label16>
                        <Label16 className='my-0 py-1'>{userInfo.email}</Label16>
                    </div>

                    <div className='d-flex p-2'>
                        <Link to='/profile/info' state={{ position: 'first' }}><HuntLabel16 className='border-right pr-4'>Edit</HuntLabel16></Link>
                        <Link to='/profile/info' state={{ position: 'password' }}><HuntLabel16>Change Password</HuntLabel16></Link>
                    </div>

                </div>
                <div className='col-sm-7'>
                    <Label16 className='m-0 mb-2'>Newsletters</Label16>
                    <div style={{ height: 70 }}>
                        <Label16 className='my-0 py-1' style={{ color: '#89939E' }}>You aren't subscribed to our newsletter</Label16>
                    </div>
                    <div className='d-flex p-2' style={{ height: 48 }}>
                        <SubscribeInput className="px-2" type='email' name='subscribe' placeholder="Type here your Email" style={{ border: '1px solid #D2DBE3' }} />
                        <SubscribeButton>Subscribe</SubscribeButton>
                    </div>
                </div>
            </div>
            <div className='row my-3' style={{ background: '#fff' }}>
                <div className='d-flex justify-content-between border-bottom'>
                    <ProfileTitle className='p-3'>Address Book</ProfileTitle>
                    <HuntLabel16><IoMdAdd /> Add Address</HuntLabel16>
                </div>
                <div className='col-sm-5'>
                    <Label16 className='m-0 mb-2'>Default Billing Address</Label16>
                    {
                        address.billAddress ?
                            <>
                                <div className='d-grid' style={{ height: 150 }}>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>{address.billAddress.first_name + " " + address.billAddress.last_name}</Label16>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>{address.billAddress.street_address + " " + address.billAddress.city + " " + address.billAddress.state + " " + address.billAddress.zip_code}</Label16>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>Tel: {address.billAddress.contact_number}</Label16>
                                </div>
                                <div style={{ width: 'fit-content' }}>
                                    <Link to="/profile/address/edit" state={{ address: 'billing' }}><HuntLabel16 style={{ background: '#F2F7F2', padding: '14px 17px' }}>Edit Address</HuntLabel16></Link>
                                </div>
                            </>
                            :
                            <>
                                <HuntLabel16 className='my-0 py-1' style={{ color: '#717171', height: 50 }}>{address.emptyBillText}</HuntLabel16>
                                <div style={{ width: 'fit-content' }}>
                                    <Link to="/profile/address/add" state={{ address: 'billing' }}><HuntLabel16 style={{ background: '#355E3B', color: "#ffffff", padding: '14px 17px' }}>Add New Address</HuntLabel16></Link>
                                </div>
                            </>
                    }
                </div>
                <div className='col-sm-7'>
                    <Label16 className='m-0 mb-2'>Default Shipping Address</Label16>
                    {
                        address.shipAddress ?
                            <>
                                <div className='d-grid' style={{ height: 150 }}>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>{address.shipAddress.first_name + " " + address.shipAddress.last_name}</Label16>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>{address.shipAddress.street_address + " " + address.shipAddress.city + " " + address.shipAddress.state + " " + address.shipAddress.zip_code}</Label16>
                                    <Label16 className='my-0 py-1' style={{ color: '#717171' }}>Tel: {address.shipAddress.contact_number}</Label16>
                                </div>
                                <div style={{ width: 'fit-content' }}>
                                    <Link to="/profile/address/edit" state={{ address: 'shipping' }}><HuntLabel16 style={{ background: '#F2F7F2', padding: '14px 17px' }}>Edit Address</HuntLabel16></Link>
                                </div>
                            </>
                            :
                            <>
                                <HuntLabel16 className='my-0 py-1' style={{ color: '#717171', height: 50 }}>{address.emptyShipText}</HuntLabel16>
                                <div style={{ width: 'fit-content' }}>
                                    <Link to="/profile/address/add" state={{ address: 'shipping' }}><HuntLabel16 style={{ background: '#355E3B', color: "#ffffff", padding: '14px 17px' }}>Add New Address</HuntLabel16></Link>
                                </div>
                            </>
                    }
                </div>
            </div>

            <div className='row my-3 bg-white'>
                <div className='d-flex justify-content-between border-bottom mb-2'>
                    <ProfileTitle className='p-3'>Recent Orders</ProfileTitle>
                    <HuntLabel16>View All</HuntLabel16>
                </div>
                <div className='p-1 desktop_version'>
                    <Table>
                        <thead style={{ background: '#F5F7FA', marginTop: 10 }}>
                            <tr style={{ marginTop: 10 }}>
                                <Th>ORDER #</Th>
                                <Th>DATE</Th>
                                <Th>SHIP TO</Th>
                                <Th>ORDER TOTAL</Th>
                                <Th>STATUS</Th>
                                <Th>ACTION</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>006665563</Td>
                                <Td>1/17/23</Td>
                                <Td>Cameron Williamson</Td>
                                <Td>$ 85.00</Td>
                                <Td>Pending</Td>
                                <Td>View</Td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;