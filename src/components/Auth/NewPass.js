import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { notification } from '../../actions/notificantion';
import { base_url } from '../../config/config';
import { CartButton, CommonLabel, Input } from '../Store/StyledCom';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useValidator } from '../Validation/ResetPassword/useValidator';

function NewPass(props) {

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });
    const { errors, validateForm, onBlurField } = useValidator(form);

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        }
        setForm(nextFormState);
        if (errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        const config = {
            method: 'put',
            url: base_url + 'profile/changepassword',
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
            data: {
                email: props.email,
                password: form.password
            }
        }
        // console.log(config);
        axios(config)
            .then((result) => {
                notification(result.data.message);
                props.closeNewPass();
            })
            .catch((e) => {
                notification('Password was not changed, Try again.');
                console.log(e);
            })
    }
    return (
        <Modal show={props.showNewPass} onHide={props.closeNewPass}>
            <ToastContainer autoClose={2000} />
            <Modal.Body>
                <div className='mx-auto'>
                    <div className="d-flex justify-content-end">
                        <RiCloseFill size={25} onClick={props.closeNewPass} />
                    </div>
                    <form noValidate autoComplete="off" onSubmit={onSubmit}>

                        <CommonLabel className="my-2">New Password</CommonLabel>
                        <div style={{ height: 40 }}>
                            <Input type="password" name="password" onChange={onUpdateField} onBlur={onBlurField} />
                        </div>
                        {errors.password.dirty && errors.password.error ? (
                            <p className="text-danger">{errors.password.message}</p>
                        ) : null}

                        <CommonLabel className="my-2">Confirm Password</CommonLabel>
                        <div style={{ height: 40 }}>
                            <Input type="password" name="confirmPassword" onChange={onUpdateField} onBlur={onBlurField} />
                        </div>
                        {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                            <p className="text-danger">{errors.confirmPassword.message}</p>
                        ) : null}

                        <CartButton className='my-4'>Submit</CartButton>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default NewPass;