import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '../../Store/StyledCom';
import { ProfileTitle } from '../../Store/StyledCom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, useCartElementState } from '@stripe/react-stripe-js';
import '../../Cart/stripe.css';
// import { stripePaymentMethodHandler } from '/';

const ShippingLabel = styled.div`
    margin-top:32px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
    color: #717171;
`

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            lineHeight: "27px",
            color: "#212529",
            fontSize: "1.1rem",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

function StripeAdd() {

    const [name, setHolderName] = useState('');

    return (
        <div className='col-sm-9'>
            <div className='my-3 py-3' style={{ background: '#fff', height: '90%' }}>
                <div className="row">
                    <div className="col-sm-4">
                        <ShippingLabel>Holder Name</ShippingLabel>
                        <div className="card_input border-0 d-grid align-items-end" style={{ height: 50 }}>
                            {/* <input className="border-0 bg-transparent" type='text' onChange={(e) => setHolderName(e.target.value)}></input> */}
                            <Input type='text' name='card_number' />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <ShippingLabel>Card Number *</ShippingLabel>
                        <div className="card_input d-grid border-0 align-items-end" style={{ height: 50 }}>
                            <Input type='text' name='card_number' />
                            {/* <CardNumberElement options={CARD_ELEMENT_OPTIONS} /> */}
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <ShippingLabel>Expiration</ShippingLabel>
                        <div className="card_input d-grid border-0 align-items-end" style={{ height: 50 }}>
                            <Input type='text' name='card_number' />
                            {/* <CardExpiryElement options={CARD_ELEMENT_OPTIONS} /> */}
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="justify-content-between d-flex">
                            <ShippingLabel>CVV</ShippingLabel>
                        </div>
                        <div className="card_input d-grid border-0 align-items-end" style={{ height: 50 }}>
                            {/* <CardCvcElement options={CARD_ELEMENT_OPTIONS} /> */}
                            <Input type='text' name="cvv" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StripeAdd;