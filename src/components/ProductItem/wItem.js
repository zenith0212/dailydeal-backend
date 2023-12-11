import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsClock, BsShare } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommonLabel, QButton, QLabel, Quantity, BuyButton } from '../Store/StyledCom';
import axios from 'axios';
import {base_url} from '../../config/config';
import TodayMarker from '../common/TimeMarker/todayMarker';

const ProductCard = styled.div`
    
`
const ProductImage = styled.img`
    max-width:100%;
    height:100%;
`
const CurrentPrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #355E3B;

`
const PrePrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-decoration-line: line-through;
    color: #717171;
`
const ProductName = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #212121;
    text-decoration: none;
    height: 50px;
`

const BuyBtn = styled.button`
    background: #355E3B;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #FFFFFF;
    width:100%;
    padding: 16px 0;
    border:none;
`
const RemoveBtn = styled.button`
    border:1px solid #355E3B;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #355E3B;
    width:100%;
    padding: 16px 0;
    border:none;
`
const cookies = new Cookies();

function WItem(props) {

    const [quantity, setQuantity] = useState(1);

    const notify = (message) => toast(message);

    const decrease = () => {
        if (quantity === 1)
            setQuantity(quantity);
        else
            setQuantity(quantity - 1);
    }
    const increase = () => {
        setQuantity(quantity + 1)
    }
    const addToCart = (product_id, product_image, product_name, product_price, product_quantity) => {
        const data = {
            product_id, product_image, product_name, product_price, product_quantity
        };
        console.log('data', data);
        var cart_items = cookies.get('cart_items');
        if (cart_items === undefined) {
            let temp = [];
            temp.push(data);
            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            });
            notify("You added this product successfully!");
        } else {
            let index = cart_items.findIndex(i => { return i.product_id == product_id });
            if (index === -1) {
                console.log("354675786867", cart_items)
                cart_items.push(data);
                cookies.set('cart_items', cart_items, {
                    path: "/",
                    maxAge:3600
                });
                notify("You added this product successfully!");
            } else {
                notify("You already added this product!");
            }
        }
    };
    const buyNow = (product_id, product_image, product_name, product_price, product_quantity) => {
        const data = {
            product_id, product_image, product_name, product_price, product_quantity
        };

        var cart_items = cookies.get('cart_items');
        if (cart_items === undefined) {
            let temp = [];
            temp.push(data);
            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            });
        } else {
            cookies.remove('cart_items');
            let temp = [];
            temp.push(data);

            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            })
        }
    }

    const deleteWishList = (product_id) => {
        const email = localStorage.getItem('email');
        const configuration = {
            method: 'delete',
            url: base_url + 'wishlist/' + product_id,
            data: {
                email: email
            }
        };

        axios(configuration)
            .then((result) => {
                console.log(result);
                window.lll=props
                props.refresh()
                notify(result.data.message);
            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    }

    return (

        <ProductCard >
            <div className='d-flex justify-content-center' style={{ height: 200 }}>
                <ProductImage src={props.product_image} alt='today_deal' />
            </div>
            {/* <div className='d-flex'>
                <TodayMarker/>
            </div> */}
            <div className='my-3'>
                <ProductName to={'/products/'+props.product_name} state={{data: props.product_id, type: 'mywishlist', price: props.sale_price}} >{props.product_name}</ProductName>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <CurrentPrice>${props.sale_price}</CurrentPrice>
                <PrePrice>${props.sale_price}</PrePrice>
            </div>

            {/* <Quantity className='my-2'>
                <QButton onClick={decrease} id='decrease'>-</QButton>
                <QLabel id='quantity'>{quantity}</QLabel>
                <QButton onClick={increase} id='increase'>+</QButton>
            </Quantity> */}

            {/* <CommonLabel style={{fontSize:14}}>
                <BsClock /><label className='ml-2 mb-0'>7hours left to buy or until sold out</label>
            </CommonLabel> */}

            <div className='row py-3'>
                {/* <div className='col-6'>
                    <BuyBtn className='w-100 px-0' onClick={() => { buyNow(props.product_id, props.product_image, props.product_name, props.sale_price, quantity) }}>Buy it Now</BuyBtn>
                </div> */}
                <div className='col-6'>
                    <RemoveBtn className='w-100 px-0' onClick={()=>deleteWishList(props.product_id)}>Remove</RemoveBtn>
                </div>
            </div>
            <ToastContainer autoClose={2000} />
        </ProductCard>

    )
}

export default WItem;