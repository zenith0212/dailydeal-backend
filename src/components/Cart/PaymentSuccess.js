import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { CartButton, CommonLabel, Summary, Title32 } from '../Store/StyledCom';
import { Link } from 'react-router-dom';

const PaymentSuccess = (props) => {

    return (
        <Modal show={props.successPayment} onHide={props.closeSuccessPayment} size="lg">
            <Modal.Body className='text-center'>
                <div>
                    <Title32 className='p-5'>Your Order has been received</Title32>
                    <div className='d-grid justify-content-center'>
                        <div className='m-auto'>
                            <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="30" cy="30.5" r="30" fill="#1AAB56" />
                                <path d="M20.667 31.8333L26.0003 37.1667L39.3337 23.8333" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <Summary className='border-0'>Thank you for your purchase!</Summary>
                        <div>
                            <CommonLabel className='d-block'>Your Order ID : <b>{props.orderID}</b></CommonLabel>
                            <CommonLabel className='d-block'>You will receive an order confirmation email details of your order.</CommonLabel>
                        </div>
                    </div>
                    <Link to='/'><CartButton className='px-3 my-4' style={{ width: 'fit-content' }}>Continue Shopping</CartButton></Link>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default PaymentSuccess;