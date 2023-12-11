import React, { useState, useEffect } from "react";
import { HuntLabel16, ProfileTitle } from "../../Store/StyledCom";
import axios from "axios";
import { base_url } from "../../../config/config";
import { notification } from "../../../actions/notificantion";
import { Link } from "react-router-dom";

function AddressShow() {
    const email = localStorage.getItem('email');
    const [billingAddress, setBillingAddress] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [emptyBillingText, setEmptyBillingText] = useState();
    const [emptyShippingText, setEmptyShippingText] = useState();

    useEffect(() => {
        axios({ url: base_url + 'address', method: 'get', params: { email: email } })
            .then((result) => {
                if (!!result.data.billing) {
                    setBillingAddress(result.data.billing);
                } else {
                    setEmptyBillingText("You have no other address entries in your address book");
                }
                if (!!result.data.shipping) {
                    setShippingAddress(result.data.shipping);
                } else {
                    setEmptyShippingText("You have no other address entries in your address book");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className='col-sm-9'>
            <div className='my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Address Book</ProfileTitle>
                <div className="row px-3">

                    <div className='col-sm-6 my-3 py-3'>
                        <HuntLabel16 className='m-0 my-2' style={{ fontWeight: 600 }}>Default Billing Address</HuntLabel16>
                        {
                            billingAddress ?
                                <>
                                    <div className='d-grid' style={{ height: 150 }}>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>{billingAddress.first_name + " " + billingAddress.last_name}</HuntLabel16>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>{billingAddress.street_address + " " + billingAddress.city + " " + billingAddress.state + " " + billingAddress.zip_code}</HuntLabel16>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>Tel: {billingAddress.contact_number}</HuntLabel16>
                                    </div>
                                    <div style={{ width: 'fit-content' }}>
                                        <Link to="/profile/address/edit" state={{address:'billing'}}><HuntLabel16 style={{ background: '#F2F7F2', padding: '14px 17px' }}>Edit Address</HuntLabel16></Link>
                                    </div>
                                </>
                                :
                                <>
                                    <HuntLabel16 className='my-0 py-1' style={{ color: '#717171', height: 50 }}>{emptyBillingText}</HuntLabel16>
                                    <div style={{ width: 'fit-content' }}>
                                        <Link to="/profile/address/add" state={{address:'billing'}}><HuntLabel16 style={{ background: '#355E3B', color: "#ffffff", padding: '14px 17px' }}>Add New Address</HuntLabel16></Link>
                                    </div>
                                </>
                        }
                    </div>
                    <div className='col-sm-6 my-3 py-3'>
                        <HuntLabel16 className='m-0 my-2' style={{ fontWeight: 600 }}>Default Shipping Address</HuntLabel16>
                        {
                            shippingAddress ?
                                <>
                                    <div className='d-grid' style={{ height: 150 }}>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>{shippingAddress.first_name + " " + shippingAddress.last_name}</HuntLabel16>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>{shippingAddress.street_address + " " + shippingAddress.city + " " + shippingAddress.state + " " + shippingAddress.zip_code}</HuntLabel16>
                                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>Tel: {shippingAddress.contact_number}</HuntLabel16>
                                    </div>
                                    <div style={{ width: 'fit-content' }}>
                                        <Link to="/profile/address/edit" state={{address:'shipping'}}><HuntLabel16 style={{ background: '#F2F7F2', padding: '14px 17px' }}>Edit Address</HuntLabel16></Link>
                                    </div>
                                </>
                                :
                                <>
                                    <HuntLabel16 className='my-0 py-1' style={{ color: '#717171', height: 50 }}>{emptyShippingText}</HuntLabel16>
                                    <div style={{ width: 'fit-content' }}>
                                        <Link to="/profile/address/add" state={{address:'shipping'}}><HuntLabel16 style={{ background: '#355E3B', color: "#ffffff", padding: '14px 17px' }}>Add New Address</HuntLabel16></Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
            {/* <div className='my-3' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>Additional Address Entries</ProfileTitle>
                <div className='col-sm-12 my-3 py-3'>
                    <HuntLabel16 className='m-0 my-2' style={{ fontWeight: 600 }}>Default Billing Address</HuntLabel16>
                    <div className='d-grid' style={{ height: 50 }}>
                        <HuntLabel16 className='my-0 py-1' style={{ color: '#717171' }}>You have no other address entries in your address book</HuntLabel16>
                    </div>
                    <div style={{ width: 'fit-content' }}>
                        <HuntLabel16 style={{ background: '#355E3B', color: "#ffffff", padding: '14px 17px' }}>Add New Address</HuntLabel16>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
export default AddressShow;