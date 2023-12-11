import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ProfileTitle, ProfileLabel, Input, SaveButton, CancelButton } from '../../Store/StyledCom';
import { base_url } from '../../../config/config';
import Cookies from 'universal-cookie';
import { useValidator } from '../../Validation/Checkout/useValidator';
import { notification } from '../../../actions/notificantion';
import { ToastContainer } from 'react-toastify';

const cookies = new Cookies();
const token = cookies.get('TOKEN');
function AddNewAddress() {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        addressEmail: "",
        streetAddress: "",
        city: "",
        zipCode: "",
        state: "",
        alternateNumber: "",
        deliveryInstruction: "",
    });

    const CheckBox = (e) => {
        setPreferredAddress(!preferredAddress);
    }
    
    const [preferredAddress, setPreferredAddress] = useState(false);
    const location = useLocation();
    const email = localStorage.getItem('email');
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
            });
    };
    const addAddress = () =>{
        const {isValid} = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        console.log({url:base_url+"address/"+location.state.address, method:'post', data:{...form, email:email, preferred:preferredAddress}});
        axios({url:base_url+"address/"+location.state.address, method:'post', data:{...form, email:email, preferred:preferredAddress}})
        .then((result)=>{
            notification(result.data.message);
        })
        .catch(error=>{
            notification("Failed to update, Try again.");
            console.log(error);
        });
    }
    return (
        <div className='col-sm-9'>
            <div className='my-3' style={{ background: '#fff' }}>
                <ToastContainer autoClose={2000}/>
                <ProfileTitle className='border-bottom p-3'>Add New Address</ProfileTitle>
                <div className='px-4 py-2'>
                    <ProfileLabel>*Required fields</ProfileLabel>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>First Name *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="firstName" value={form.firstName} onChange={onUpdateField} onBlur={onBlurField} />
                            </div>
                            {errors.firstName.dirty && errors.firstName.error ? (
                                <p className="text-danger">{errors.firstName.message}</p>
                            ) : null}
                            <ProfileLabel className='mt-4 mb-0'>Contact Number *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="contactNumber" value={form.contactNumber} onChange={onUpdateField} onBlur={onBlurField} />
                            </div>
                            {errors.contactNumber.dirty && errors.contactNumber.error ? (
                                <p className="text-danger">{errors.contactNumber.message}</p>
                            ) : null}
                            <ProfileLabel className='mt-4 mb-0'>Alternate Phone Number (Optional)</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="alternateNumber" value={form.alternateNumber} onChange={(e)=>setForm({...form, alternateNumber:e.target.value})}/>
                            </div>

                        </div>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Last Name *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="lastName" value={form.lastName} onChange={onUpdateField} onBlur={onBlurField}/>
                            </div>
                            {errors.lastName.dirty && errors.lastName.error ? (
                                <p className="text-danger">{errors.lastName.message}</p>
                            ) : null}
                            <ProfileLabel className='mt-4 mb-0'>Email Address *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="addressEmail" value={form.addressEmail} onChange={onUpdateField} onBlur={onBlurField}/>
                            </div>
                            {errors.addressEmail.dirty && errors.addressEmail.error ? (
                                <p className="text-danger">{errors.addressEmail.message}</p>
                            ) : null}
                        </div>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>Street Address *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="streetAddress" value={form.streetAddress} onChange={onUpdateField} onBlur={onBlurField}/>
                            </div>
                            {errors.streetAddress.dirty && errors.streetAddress.error ? (
                                <p className="text-danger">{errors.streetAddress.message}</p>
                            ) : null}
                            <ProfileLabel className='mt-4 mb-0'>State/Province</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="state" value={form.state} onChange={(e)=>setForm({...form, state:e.target.value})} />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <ProfileLabel className='mt-4 mb-0'>City *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="city" value={form.city} onChange={onUpdateField} onBlur={onBlurField}/>
                            </div>
                            {errors.city.dirty && errors.city.error ? (
                                <p className="text-danger">{errors.city.message}</p>
                            ) : null}
                            <ProfileLabel className='mt-4 mb-0'>Zip Code *</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name="zipCode" value={form.zipCode} onChange={onUpdateField} onBlur={onBlurField}/>
                            </div>
                            {errors.zipCode.dirty && errors.zipCode.error ? (
                                <p className="text-danger">{errors.zipCode.message}</p>
                            ) : null}
                        </div>
                        <div className='col-sm-12'>
                            <ProfileLabel className='mt-4 mb-0'>Delivery instructions</ProfileLabel>
                            <div style={{ height: 50 }}>
                                <Input type="text" name='deliveryInstruction' onChange={(e)=>setForm({...form, deliveryInstruction:e.target.value})}/>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2 my-3'>
                            <input type='checkbox' /><ProfileLabel className="m-0">Set as my preferred delivery address</ProfileLabel>
                        </div>
                        <div className='col-12 col-md-2'>
                            <SaveButton className='w-100 my-2' onClick={addAddress}>Save</SaveButton>
                        </div>
                        <div className='col-12 col-md-2'>
                            <CancelButton className='w-100 my-2'>Cancel</CancelButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewAddress;