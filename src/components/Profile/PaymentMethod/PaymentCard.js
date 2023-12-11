import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileTitle } from '../../Store/StyledCom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Card = styled.div`
    background: #F2F7F2;
    border: 1px solid #D2DBE3;
    border-radius: 8px;
    aspect-ratio:2/1;
    display: flex;
    align-items:center;
    justify-content:center;

`
const CardLabel = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #4D4D4D;
    justify-content:center;
    margin-top:5px;
`
function PaymentCard() {

    const addStripe = () => {

    }
    return (
        <div className='col-sm-9'>
            <div className='my-3 py-3' style={{ background: '#fff', height: '90%' }}>
                <ProfileTitle className='border-bottom p-3'>Add a payment method</ProfileTitle>
                <div className='row my-3 mx-4 gap-2'>
                    <Card className='col-12 col-md-4' onClick={addStripe}>
                        <Link to='/profile/savedcards/stripe/add'>
                            <div style={{ cursor: 'pointer' }}>
                                <LazyLoadImage src='/images/credit_card.png' alt='creditCard' />
                                <CardLabel>Credit/debit card</CardLabel>
                            </div>
                        </Link>
                    </Card>

                    <Card className='col-12 col-md-4'>
                        <Link to='/profile/savedcards/paypal/add'>
                            <div style={{ cursor: 'pointer' }}>
                                <LazyLoadImage src='/images/paypal.png' alt='PayPalCard' />
                                <CardLabel>PayPal</CardLabel>
                            </div>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default PaymentCard;