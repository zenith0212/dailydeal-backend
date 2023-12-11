import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsClock, BsShare } from 'react-icons/bs';
import axios from 'axios';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import { BuyButton, CartButton, CheckButton, CommonLabel, HeartIcon, QButton, QLabel, Quantity, YTimeShower } from '../Store/StyledCom';
import TodayMarker from '../common/TimeMarker/todayMarker';
import YesterdayMarker from '../common/TimeMarker/yesterdayMarker';
import { SelectPicker } from 'rsuite';
import { notification } from '../../actions/notificantion';
import useCart from '../../hooks/useCart';

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
    font-size: 40px;
    line-height: 44px;
    display: flex;
    align-items: center;
    color: #355E3B;

`
const PrePrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-decoration-line: line-through;
    color: #717171;
`
const ProductName = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: block;
    margin: 0 auto
    align-items: center;
    color: #212121;
    text-decoration: none;
`

const ItemQB = styled.div`
    width: 80%;
    margin: 0 auto;
    @media screen and (max-width:768px){
        width: 100%;
    }
`

const cookies = new Cookies();

const date = new Date();
const expire_date = new Date();
expire_date.setSeconds(date.getSeconds()+5);

function Deals(props) {

    const { count, setCount, setPrice } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [yflag, setYflag] = useState(false);
    const [product, setProduct] = useState([{ label: '', value: '', role: 'Master' }]);
    const [variations, setVariations] = useState([{ attributes: [{ option: 'aa' }], stock_quantity: 2 }]);
    const [variant, setVariant] = useState();

    var yTime = (flag) => {
        setYflag(flag);
    }


    useEffect(() => {
        var v_items = [];

        const conf = {
            url: `https://nova.shopwoo.com/api/v1/products/${props.product_id}?store_id=2&lang=en`,
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
                'Content-Type': 'application/json'
            },
        };

        axios(conf).then((result) => {
            setVariations(result.data.variations);

            for (var i in result.data.variations) {
                var item = result.data.variations[i];
                if (item.stock_quantity !== 0) {
                    v_items.push({
                        label: item.attributes[0].option + "   " + item.stock_quantity + "    in stock",
                        value: [item.id, item.stock_quantity],
                        role: 'Master'
                    });
                }
            }

            setProduct(v_items);
            setVariant(v_items[0].value);
        })
    }, [])

    const decrease = () => {
        if (quantity === 1)
            setQuantity(quantity);
        else
            setQuantity(quantity - 1);
    }
    const increase = () => {
        if (quantity > 0 && quantity < variant[1])
            if (quantity < 3)
                setQuantity(quantity + 1);
            else {
                notification('You can phurcase only three quantities.');
            }
    }

    const addToCart = (product_id, product_image, product_name, product_price, product_quantity) => {

        const data = {
            product_id, variant, product_image, product_name, product_price, product_quantity
        };

        console.log('data', data.variant[0]);

        var cart_items = cookies.get('cart_items');

        if (cart_items === undefined) {
            let temp = [];
            temp.push(data);
            cookies.set('cart_items', temp, {
                path: '/',
                maxAge: 3600,
            });
            notification("You added this product successfully! :)");
            setCount(1);
            setPrice(product_price * product_quantity);
        } else {
            let index = cart_items.findIndex(i => { return i.product_id == product_id });
            console.log(expire_date, date.getSeconds());
            if (index === -1) {
                cart_items.push(data);
                cookies.set('cart_items', cart_items, {
                    path: "/",
                    maxAge: 3600,
                });
                notification("You added this product successfully! :)");
                setCount(1);
                setPrice(product_price * product_quantity);
            } else {
                notification("You already added this product!");
            }
        }
    };

    const buyNow = (product_id, product_image, product_name, product_price, product_quantity) => {
        const data = {
            product_id, variant, product_image, product_name, product_price, product_quantity
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
    const changeVariant = (e) => {
        setQuantity(1);
        setVariant(e);
    }

    return (

        <ProductCard className='col-md-6 my-4 ' style={{borderWidth:"1px", borderColor:"black"}}>
            <div className='d-flex justify-content-center' style={{ height: 300 }}>
                <ProductImage src={props.product_image} alt='today_deal' />
            </div>
            <div className='d-flex justify-content-between' style={{width:"80%",margin:"auto"}}>
                {
                    !props.yesterday ?
                        <TodayMarker /> :
                        <YesterdayMarker />
                }
                <div className='d-flex gap-3 '>
                    <div style={{margin:"auto"}}>
                        <BsShare size={25} />
                    </div>
                    <HeartIcon style={{margin:"auto"}}>
                        <MdOutlineFavoriteBorder size={25} />
                    </HeartIcon>
                </div>
            </div>
            <div className='my-3' style={{width:"80%",margin:"auto"}}>
                <ProductName to={'/products/' + props.product_name} state={{ data: props.product_id, type: 'today', price: props.sale_price, leftTime:props.leftTime }}>{props.product_name}</ProductName>
            </div>
            <ItemQB>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center gap-2'>
                        <CurrentPrice>${props.sale_price}</CurrentPrice>
                        <PrePrice>${props.sale_price}</PrePrice>
                    </div>
                    <SelectPicker data={product} onChange={changeVariant} block searchable={false} placeholder={product[0].label} />
                </div>
                <Quantity>
                    <QButton onClick={decrease} id='decrease'>-</QButton>
                    <QLabel id='quantity'>{quantity}</QLabel>
                    <QButton onClick={increase} id='increase'>+</QButton>
                </Quantity>

                <CommonLabel>
                    <BsClock /><label className='ml-2 mb-0'>{Math.floor(props.leftTime/3600)} hours left to buy or until sold out</label>
                </CommonLabel>

                <div className='row'>
                    <div className='col-6'>
                        <CartButton onClick={() => { addToCart(props.product_id, props.product_image, props.product_name, props.sale_price, quantity) }}>Add to Cart</CartButton>
                    </div>
                    <div className='col-6'>
                        <Link to='/checkout' state={{ quantity: [quantity], data: props.sale_price * quantity }}><BuyButton onClick={() => { buyNow(props.product_id, props.product_image, props.product_name, props.sale_price, quantity) }}>Buy it Now</BuyButton></Link>
                    </div>
                </div>
            </ItemQB>
            <ToastContainer autoClose={2000} />

        </ProductCard>

    )
}

export default Deals;