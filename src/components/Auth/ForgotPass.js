import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../../config/config';
import Modal from 'react-bootstrap/Modal';
import { RiAppleFill, RiCloseFill } from 'react-icons/ri';
import { CartButton, CommonLabel, Input, Label14, SocialButton, Title32 } from '../Store/StyledCom';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import NewPass from './NewPass';
import Cookies from 'universal-cookie';
import { useValidator } from '../Validation/ForgotPassword/useValidator';

const cookies = new Cookies();
var token;
function ForgotPass(props) {

    const [showNewPass, setShowNewPass] = useState(false);
    const [form, setForm] = useState({
        email: "",
        code: ''
    });
    const [codeSent, setCodeSent] = useState(false);

    const closeNewPass = () => setShowNewPass(false);
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
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(form.email);

        if (codeSent) {
            const config = {
                method: 'post',
                url: base_url + 'verify',
                data: {
                    code: form.code
                }
            }
            axios(config)
                .then(() => {
                    props.closeForgotPass();
                    setShowNewPass(true);
                })
                .catch((error) => {
                    notification(error.response.data.error_message);
                })
        } else {
            const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
            if (!isValid) return;
            try {
                const config = {
                    method: 'get',
                    url: base_url + 'password-reset',
                    params: {
                        email: form.email
                    }
                }
                axios(config)
                    .then((result) => {
                        // console.log(result);
                        setCodeSent(true);
                        token = result.data.token;
                        notification(result.data.message);
                    })
                    .catch((error) => {
                        console.log(error);
                        notification(error.response.data.message);
                    })
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    notification(error);
                }
            }
        }
    }
    return (
        <>
            <Modal show={props.showForgotPass} onHide={props.closeForgotPass}>
                <ToastContainer autoClose={2000} />
                <Modal.Body>
                    <div className='mx-auto'>
                        <div className="d-flex justify-content-end">
                            <RiCloseFill size={25} onClick={props.closeForgotPass} />
                        </div>
                        <Title32>Did you forget your password?</Title32>
                        <form noValidate autoComplete="off" onSubmit={onSubmit}>
                            <CommonLabel className="my-2">Email Address</CommonLabel>
                            <div style={{ height: 40 }}>
                                <Input type="email" name="email" value={form.email} onChange={onUpdateField} onBlur={onBlurField} />
                            </div>
                            {errors.email.dirty && errors.email.error ? (
                                <p className="text-danger">{errors.email.message}</p>
                            ) : null}
                            {
                                codeSent ?
                                    <>
                                        <CommonLabel className="my-2">Sent code to your mail</CommonLabel>
                                        <div style={{ height: 40 }}>
                                            <Input type="text" name="code" value={form.code} onChange={onUpdateField} onBlur={onBlurField} />
                                        </div>
                                        {errors.code.dirty && errors.code.error ? (
                                            <p className="text-danger">{errors.code.message}</p>
                                        ) : null}
                                    </>
                                    :
                                    <>
                                    </>
                            }

                            <CartButton className='my-4'>Submit</CartButton>

                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <NewPass token={token} showNewPass={showNewPass} closeNewPass={closeNewPass} email={form.email} />
        </>
    )
}
export default ForgotPass;