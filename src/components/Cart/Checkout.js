import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ContactCard from "../common/contactCard";
import Cookies from "universal-cookie";
import styled from "styled-components";
import SearchTime from "../common/SearchTime";
import { Input, HLinkContainer, LinkH, ProductHeader, CartButton, BuyButton, Summary, SummaryTitle, SummaryValue, ShippingDate } from "../Store/StyledCom";
import Banner from "../HomePage/banner";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, useCartElementState } from '@stripe/react-stripe-js';
import './stripe.css'
import { stripePaymentMethodHandler } from "./PaymentAPI";
import PaymentSuccess from "./PaymentSuccess";
import { CountryDropdown } from "react-country-region-selector";
import FailedMessage from "./FailedMessage";
import axios from 'axios';
import { useValidator } from "../Validation/Checkout/useValidator";
import { base_url } from "../../config/config";
import { notification } from "../../actions/notificantion";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from '../../config/config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HeaderSub = styled.div`
  background: #F2F7F2;
  color:#355E3B;
  padding:19px 65px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em; 
  @media only screen and (max-width:768px){
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
  }
`
const CheckoutHeader = styled.div`
//'Open Sans';
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.02em;
    color: #4D4D4D;
    padding: 13.5px 0;
    margin-top:32px;
    display:flex;
    border-bottom:1px solid #D2DBE3;
`
const RequiredField = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #717171;
    display:flex;
    align-items:center;
    margin:0;
`
const ShippingLabel = styled.div`
    margin-top:32px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
    color: #717171;
`

const SaveButton = styled.button`
    background: #F2F7F2;
    border:none;
    border-radius: 4px;
    color: #355E3B;
    width: 100%;
    height: 60px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content:center;
`
const CancelButton = styled.button`
    background: transparent;
    border:none;
    border-radius: 4px;
    color: #355E3B;
    width: 100%;
    height: 60px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ViewDetail = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #355E3B;
`
const PaymentLabel = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: #355E3B;
    padding:18px 8px;

`
const Description = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #89939E;
    margin-top: 22px;
`
const Paypalbtn = styled.button`
    background: #194478;
    border-radius: 4px;
    // font-family: 'Open Sans';
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    padding: 16.5px 160px;
    color: #FFFFFF;
    border: none;
`
const InputDescription = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #717171;
`
const CheckoutContainer = styled.div`
    padding-top: 70px;
    @media only screen and (max-width:768px){
        padding:0;
    }
`
const cookies = new Cookies();


const contactUs = {
    title: "Contact Us",
    description: "Log in for personalized service and assistance.",
    buttonName: "Log in"
}
const chatNow = {
    title: "Chat Now",
    description: "Chat live with one of our experts",
    buttonName: "Hello"
}
const callUs = {
    title: "Call us",
    description: "Our customer care experts are standing by.",
    buttonName: "Log in"
}


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

const email = localStorage.getItem('email');

function Checkout() {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        addressEmail: "",
        streetAddress: "",
        city: "",
        zipCode: "",
        state: ""
    });

    const [cartList, setCartList] = useState([]);
    const [cartFlag, setCartFlag] = useState(false);

    const location = useLocation();

    const stripe = useStripe();
    const elements = useElements()
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setHolderName] = useState('');
    const [successPayment, setSuccessPayment] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);
    const [orderID, setOrderID] = useState();
    const [country, setCountry] = useState("United States");
    const [preferredAddress, setPreferredAddress] = useState(false);
    const [paypalSuccess, setPaypalSuccess] = useState(false);


    const CheckBox = (e) => {
        setPreferredAddress(!preferredAddress);
    }

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

    var items = [];

    for (var i in cartList) {
        var item = cartList[i];
        // console.log(item.variant[0])
        items.push({
            "product_id": Number(item.product_id),
            "quantity": location.state.quantity[i],
            "variation_id": Number(item.variant[0])
        })
    }

    const shipping = {
        'first_name': form.firstName,
        'last_name': form.lastName,
        'address_1': form.streetAddress,
        'address_2': '',
        'city': form.city,
        'state': form.state,
        'postcode': form.zipCode,
        'country': country,
        'phone': form.contactNumber,
        'email': form.addressEmail
    }
    const closeSuccessPayment = () => setSuccessPayment(false);
    const closeFailedMessage = () => setFailedMessage(false);

    const handleStripe = async (e) => {
        e.preventDefault();
        console.log(email);
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;

        if (!stripe || !elements) {
            console.log('not stripe');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        const paymentMethodObj = {
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name, email: form.email
            },
        };
        const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);

        stripePaymentMethodHandler({
            result: paymentMethodResult,
            amount: location.state.data,
            id: (new Date()).getTime(),
            line_items: items,
            shipping: shipping

        }, handleResponse);
    };

    const handleResponse = response => {
        setLoading(false);
        if (response.error) {
            setErrorMsg(response.error.message);
            return;
        }

        if (typeof response.orderID === 'number') {
            setSuccessPayment(true);
            setOrderID(response.orderID);
        }
        else {
            setFailedMessage(true);
            setOrderID(response.orderID);
        }
    }
    useEffect(() => {

        let cart_list = cookies.get("cart_items");
        setCartList(cart_list);

        if (cart_list !== undefined) {
            setCartFlag(true);
        }

        axios({ url: base_url + 'address', method: 'get', params: { email: email } })
            .then((result) => {
                setForm({
                    ...form,
                    firstName: result.data.shipping.first_name,
                    lastName: result.data.shipping.last_name,
                    contactNumber: result.data.shipping.contact_number,
                    addressEmail: result.data.shipping.address_email,
                    streetAddress: result.data.shipping.street_address,
                    city: result.data.shipping.city,
                    zipCode: result.data.shipping.zip_code,
                    state: result.data.shipping.state,
                });
                setCountry(result.data.shipping.country);
            })

    }, [])

    const saveAddress = () => {

        axios({ url: base_url + 'address', method: 'post', data: { ...form, email: email, country: country, preferred: preferredAddress } })
            .then((result) => {
                notification(result.data.message);
            })
            .catch((error) => {
                notification(error);
            })
    }

    const createPaypalOrder = (data, actions) => {

        console.log(shipping);
        return actions.order.create({
            purchase_units: [
                {
                    description: 'Goods',
                    amount: {
                        currency_code: "USD",
                        // value: location.state.data,
                        value: 1,
                    },
                },
            ],
        }).then((paypalOrderID) => {
            console.log('paypalorderID', paypalOrderID);
            //   setPaypalOrderID(paypalOrderID);

            return paypalOrderID;

        });
    };

    const onPaypalApprove = (data, actions) => {
        // console.log('shipping',shipping);
        return actions.order.capture().then(async function (details) {
            const { payer } = details;
            setPaypalSuccess(true);
            try{

                const result = await axios({
                    method: 'post', url: base_url + 'pay/paypal', data: {
                        amount: location.state.data,
                        order_id: (new Date()).getTime(),
                        line_items: items,
                        shipping: shipping,
                        email: localStorage.getItem('email')
                    }
                });
                if (!isNaN(result.data.orderID)) {
                    setSuccessPayment(true);
                    setOrderID(result.data.orderID);
                    // notification('Paypal payment was completed.');
                }
                else {
                    console.log(!isNaN(result.data.orderID), typeof result.data.orderID==="number")
                    setFailedMessage(true);
                    setOrderID(result.data.orderID);
                    console.log(result)
                }

            } catch(err){
                notification(err);
            }
            // console.log('approved', payer);
        });
    };

    const handlePaypal = () => {
        console.log('Paypal clicked', shipping)
    }

    return (
        <>
            <CheckoutContainer>
                <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
                    <ToastContainer autoClose={2000} />
                    <div className="container">
                        <SearchTime />
                        <HLinkContainer>
                            <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
                        </HLinkContainer>
                        <ProductHeader className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-end gap-3'>
                                Checkout
                                <h5 className="m-auto">({!!cartList ? cartList.length : 0} item)</h5>
                            </div>
                            <HeaderSub>
                                <label>For the best shopping experience, <Link to='signin'>Sign in</Link></label>
                            </HeaderSub>
                        </ProductHeader>

                        <form onSubmit={handleStripe}>
                            <div className="row checkout">
                                <div className="col-12 col-md-7">
                                    <CheckoutHeader className="gap-3">
                                        1.Shipping Address <RequiredField> *Required fields</RequiredField>
                                    </CheckoutHeader>
                                    <div id="address" className="collapse show">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <ShippingLabel>First Name *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="firstName" value={form.firstName} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.firstName.dirty && errors.firstName.error ? (
                                                    <p className="text-danger">{errors.firstName.message}</p>
                                                ) : null}
                                            </div>
                                            <div className="col-sm-6">
                                                <ShippingLabel>Last Name *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="lastName" value={form.lastName} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.lastName.dirty && errors.lastName.error ? (
                                                    <p className="text-danger">{errors.lastName.message}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <ShippingLabel>Contact Number *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="contactNumber" value={form.contactNumber} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.contactNumber.dirty && errors.contactNumber.error ? (
                                                    <p className="text-danger">{errors.contactNumber.message}</p>
                                                ) : null}
                                            </div>
                                            <div className="col-sm-6">
                                                <ShippingLabel>Email Address *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="addressEmail" value={form.addressEmail} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.addressEmail.dirty && errors.addressEmail.error ? (
                                                    <p className="text-danger">{errors.addressEmail.message}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <ShippingLabel>Street Address *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="streetAddress" value={form.streetAddress} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.streetAddress.dirty && errors.streetAddress.error ? (
                                                    <p className="text-danger">{errors.streetAddress.message}</p>
                                                ) : null}
                                            </div>
                                            <div className="col-sm-3">
                                                <ShippingLabel>City *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="city" value={form.city} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.city.dirty && errors.city.error ? (
                                                    <p className="text-danger">{errors.city.message}</p>
                                                ) : null}
                                            </div>
                                            <div className="col-sm-3">
                                                <ShippingLabel>Zip Code *</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="zipCode" value={form.zipCode} onChange={onUpdateField} onBlur={onBlurField} />
                                                </div>
                                                {errors.zipCode.dirty && errors.zipCode.error ? (
                                                    <p className="text-danger">{errors.zipCode.message}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-sm-3">
                                                <ShippingLabel>State</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <Input type='text' name="state" value={form.state} onChange={onUpdateField} />
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <ShippingLabel>Country</ShippingLabel>
                                                <div style={{ height: 50 }}>
                                                    <CountryDropdown className="card_input" value={country} onChange={(val) => setCountry(val)} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 d-flex align-items-end mt-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <input type='checkbox' value={preferredAddress} onChange={CheckBox} />Set as my preferred delivery address
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row my-4">
                                            <div className="col-12 col-md-3">
                                                <SaveButton type="button" onClick={saveAddress}>Save</SaveButton>
                                            </div>
                                            <div className="col-12 col-md-3">
                                                <CancelButton type="reset" onClick={() => console.log('canceled')}>Cancel</CancelButton>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <CheckoutHeader className="justify-content-between">
                                            <label>Items details</label>
                                            <ViewDetail><AiOutlineEye /> View Details</ViewDetail>
                                        </CheckoutHeader>
                                        <div className="d-flex gap-2">
                                            {
                                                cartFlag && (!!cartList ? cartList.length > 0 : false) ? cartList.map((item) => (
                                                    <LazyLoadImage key={item.product_id} src={item.product_image} className='border m-2' style={{ width: 50 }} alt="thumbnail" />
                                                )) : <div>Not Products</div>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <CheckoutHeader>
                                            2. Payment method
                                        </CheckoutHeader>
                                        <div>
                                            <PaymentLabel>Pay with Card</PaymentLabel>
                                            <LazyLoadImage src="/images/card.png" alt="card" className="w-100" />
                                            <Description>Learn more about payment methods we accept.</Description>

                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <ShippingLabel>Holder Name</ShippingLabel>
                                                    <div className="card_input d-grid align-items-end" style={{ height: 50 }}>
                                                        <input className="border-0 bg-transparent" type='text' onChange={(e) => setHolderName(e.target.value)}></input>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <ShippingLabel>Card Number *</ShippingLabel>
                                                    <div className="card_input d-grid align-items-end" style={{ height: 50 }}>
                                                        {/* <Input type='text' name='card_number' /> */}
                                                        <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <ShippingLabel>Expiration</ShippingLabel>
                                                    <div className="card_input d-grid align-items-end" style={{ height: 50 }}>
                                                        <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="justify-content-between d-flex">
                                                        <ShippingLabel>CVV</ShippingLabel>
                                                        <ShippingLabel><AiOutlineEyeInvisible />Hide</ShippingLabel>
                                                    </div>
                                                    <div className="card_input d-grid align-items-end" style={{ height: 50 }}>
                                                        <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                                                        {/* <Input type='text' name="cvv" /> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <CheckoutHeader>Other ways to pay</CheckoutHeader>
                                            <PaymentLabel>Pay with PayPal</PaymentLabel>
                                            <div className="d-flex gap-2 my-3">
                                                <input type='checkbox' /><Description style={{ margin: 0 }}>Remember my PayPal account details</Description>
                                            </div>
                                            <Paypalbtn>Paypal</Paypalbtn>
                                        </div>
                                    </div>
                                    <div>
                                        <CheckoutHeader>
                                            3.Mobile contact
                                        </CheckoutHeader>
                                        <div>
                                            <Description>We'll contact you in case anything comes up with your order.</Description>

                                            <ShippingLabel>Phone number(10 digits)*</ShippingLabel>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div style={{ height: 50 }}>
                                                        <Input type='text' name="contact_number" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="d-flex align-items-start gap-2">
                                                        <input type='checkbox' className="mt-2" /><Description style={{ margin: 0 }}>I want to receive text updates about the status of my order.</Description>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <InputDescription>Message and data rates may apply. Number and frequency of automated texts may vary based on your order. Consent not required for purchase. By continuing, you agree to our Mobile Alert Terms.</InputDescription>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-5">
                                    <Summary>Summary</Summary>
                                    <SummaryTitle>
                                        <label>Subtotal({!!cartList ? cartList.length : 0}items)</label>
                                        <SummaryValue>${location.state.data}</SummaryValue>

                                    </SummaryTitle>
                                    <SummaryTitle>
                                        <label>Estimated total</label>
                                        <SummaryValue>${location.state.data}</SummaryValue>
                                    </SummaryTitle>
                                    <SummaryTitle>
                                        <label>Tax included and shipping calculated as checkout</label>
                                    </SummaryTitle>

                                    <div>
                                        <ShippingDate>Free shipping, arrives Fri, Jan 27</ShippingDate>
                                        <div className='row my-5'>
                                            <div className='col-sm-6 my-2'>
                                                <CartButton className='w-100' disabled={loading} type='submit'>
                                                    {
                                                        loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : "Checkout"
                                                    }
                                                </CartButton>
                                                {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
                                            </div>

                                            <div className='col-sm-6 my-2'>
                                                {/* <BuyButton className='w-100'>Checkout with Paypal</BuyButton> */}
                                                <PayPalButtons
                                                    style={{ layout:'horizontal', label: "buynow", tagline: false, height:55 }}
                                                    createOrder={createPaypalOrder}
                                                    forceReRender
                                                    onApprove={onPaypalApprove}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <LazyLoadImage src='/images/payment_list.png' alt='payment method' className="w-100" />
                                </div>
                            </div>
                        </form>
                        <ProductHeader className='border-top'>Get in touch</ProductHeader>
                        <div className='row' style={{ marginTop: 55, marginBottom: 100 }}>
                            <div className='col-sm-4 my-2'>
                                <ContactCard {...contactUs} />
                            </div>
                            <div className='col-sm-4 my-2'>
                                <ContactCard {...chatNow} />
                            </div>
                            <div className='col-sm-4 my-2'>
                                <ContactCard {...callUs} />
                            </div>
                        </div>
                    </div>
                </PayPalScriptProvider>
            </CheckoutContainer>
            <Banner />
            <FailedMessage orderID={orderID} failedMessage={failedMessage} closeFailedMessage={closeFailedMessage} />
            <PaymentSuccess orderID={orderID} successPayment={successPayment} closeSuccessPayment={closeSuccessPayment} />
        </>
    )
}
export default Checkout;