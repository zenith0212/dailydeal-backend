import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from '../common/contactCard';
import CartItem from './CartItem';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from '../../config/config';
import styled from 'styled-components';
import SearchTime from '../common/SearchTime';
import { HLinkContainer, LinkH, ProductHeader, CartButton, BuyButton, Summary, SummaryTitle, SummaryValue, ShippingDate } from '../Store/StyledCom';
import Banner from '../HomePage/banner';
import useCart from '../../hooks/useCart';
import { getCartInfo } from '../../actions/getCartInfo';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const CartContainer = styled.div`
  padding-top:70px;
  @media only screen and (max-width: 768px){
    padding:0;
  }
`
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
  @media only screen and (max-width: 768px){
    padding: 10px 20px;
    font-size:16px;
    font-weight: 600px;
    text-align: center;
  }
`
const ShoppingTitle = styled.div`
  display: flex;
  align-items:end;
  @media only screen and (max-width: 768px){
    margin-top:20px;
  }

`

const cookies = new Cookies();

const contactUs = {
  key: 0,
  title: "Contact Us",
  description: "Log in for personalized service and assistance.",
  buttonName: "Log in"
}
const chatNow = {
  key: 1,
  title: "Chat Now",
  description: "Chat live with one of our experts",
  buttonName: "Hello"
}
const callUs = {
  key: 2,
  title: "Call us",
  description: "Our customer care experts are standing by.",
  buttonName: "Log in"
}
function Cart() {

  const { count, setCount, setPrice } = useCart();

  const [cartFlag, setCartFlag] = useState(true);
  const [cartList, setCartList] = useState([]);
  const [paypalSuccess, setPaypalSuccess] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [paypalOrderID, setPaypalOrderID] = useState('');
  const [totalPrice, setTotalPrice] = useState();

  const paypalRef = useRef();

  const cartInfor = getCartInfo();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Goods',
          amount: {
            currency_code: "USD",
            value: 1,
          },
        },
      ],
    }).then((paypalOrderID) => {
      setPaypalOrderID(paypalOrderID);
      return paypalOrderID;

    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setPaypalSuccess(true);
      console.log('approved', payer);
      notification('Paypal payment was completed.');
    });
  };

  const onError = (data, actions) => {
    setPaypalErrorMessage("An Error occured with your payment");
  };

  useEffect(() => {
    let cart_list = cookies.get("cart_items");

    // console.log('paypal_client_id', process.env.REACT_APP_PAYPAL_CLIENT_ID);

    setCount(0);

    if (cart_list === undefined) {
      setCartFlag(false);
    } else {
      setCartList(cart_list);
    }

    if (paypalSuccess) {
      // alert('payment successfull!');
      // notification('Paypal payment was completed.');
    }
  }, [cartList]);

  const removeItem = (id, quantity) => {
    const list = cookies.get("cart_items")
    let index = list.findIndex(i => { return i.product_id == id });

    setPrice(-(list[index].product_price * Number(quantity)));

    list.splice(index, 1);
    cookies.set("cart_items", list, {
      path: '/',
      maxAge: 3600
    });
    setCartList(list);
    setCount(-1);
  };

  var total = 0;
  var quantitis = [];
  var variations = [];

  const handlePrice = (price, quantity) => {
    total += price;
    quantitis.push(quantity);
    setTotalPrice(total);
    // console.log("quantitis", quantitis)
  }

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <ToastContainer autoClose={2000}/>
      <CartContainer>
        <div className="container">
          <SearchTime />
          <HLinkContainer>
            <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
          </HLinkContainer>
          <ProductHeader className='d-flex align-items-center justify-content-between'>
            <HeaderSub className='mobile_version'>
              <label>For the best shopping experience, <Link to='signin'>Sign in</Link></label>
            </HeaderSub>
            <ShoppingTitle className='gap-2'>
              Shopping Cart <h4 className='m-auto'>({cartList.length} item)</h4>
            </ShoppingTitle>
            <HeaderSub className='desktop_version'>
              <label>For the best shopping experience, <Link to='signin'>Sign in</Link></label>
            </HeaderSub>
          </ProductHeader>
          <div className="row">
            <div className="col-sm-7">
              {
                cartFlag ? cartList.map((item, index) => (
                  <div className="my-3" key={index}>
                    <CartItem removeItem={removeItem} {...item} handlePrice={handlePrice} />
                  </div>
                )) : <div className='py-4'>Not available</div>
              }
            </div>
            <div className="col-sm-5">
              <Summary>Summary</Summary>
              <SummaryTitle>
                <label>Subtotal({cartList.length}items)</label>
                <SummaryValue>${totalPrice}</SummaryValue>
              </SummaryTitle>
              <SummaryTitle>
                <label>Estimated total</label>
                <SummaryValue>${totalPrice}</SummaryValue>
              </SummaryTitle>
              <SummaryTitle>
                <label>Tax included and shipping calculated as checkout</label>
              </SummaryTitle>

              <div>
                <ShippingDate>Free shipping, arrives Fri, Jan 27</ShippingDate>
                <div className='row my-5'>
                  <div className='col-sm-6 my-2'>
                    <Link to='/checkout' state={{ data: totalPrice, quantity: quantitis }}>
                      <CartButton className='w-100'>Checkout</CartButton>
                    </Link>
                  </div>

                  <div className='col-sm-6 my-2'>
                    {/* <BuyButton className='w-100'>Checkout with Paypal</BuyButton> */}
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      forceReRender
                      onApprove={onApprove}
                    />
                  </div>
                </div>
              </div>
              <LazyLoadImage src='/images/payment_list.png' alt='payment_method' className='w-100' />
            </div>
          </div>
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
        <Banner />
      </CartContainer>
    </PayPalScriptProvider>
  )
}
export default Cart;