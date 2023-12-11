import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { QButton, QLabel, Quantity } from '../Store/StyledCom';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import useCart from '../../hooks/useCart';
import { updateCartItem } from '../../actions/updateCartItem';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Desktop = styled.div`
    @media only screen and (max-width:768px){
        display:none;
    }
`
const Mobile = styled.div`
    display: none;
    @media only screen and (max-width:768px){
        display:block;
    }
`
const ItemImage = styled.div`
    display: flex;
    justify-content: center;
    width:100px;
    border: 1px solid #D2DBE3;
    border-radius: 8px;
    @media only screen and (max-width:768px){
        width: auto;
    }
`
const ItemName = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #4D4D4D;
    width:50%;
    @media only screen and (max-width:768px){
        width:100%;
    }
`
const ItemText = styled.div`
    // width:100%;
    // margin-left: 20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`
const RemoveButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #355E3B;
    background: #F2F7F2;
    border-radius: 4px;
    border:none;
    padding: 6.5px 21px;
    @media only screen and (max-width:768px){
        padding:0;
        width:100%;
        height:35px;
    }
`
const ItemPrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #212121;
    width: 80px;
    text-align: end;
    @media only screen and (max-width:768px){
        text-align:start;
    }
`
const cookies = new Cookies();

function CartItem(props) {

    const { setPrice } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState();

    const handleRemove = (id, quantity) => {
    props.handlePrice(-props.product_price * quantity, 0)
    props.removeItem(id, quantity);
    }

    useEffect(() => {
        setQuantity(props.product_quantity);
        setStock(props.variant);
    }, [handleRemove]);

    const decrease = () => {
        if (quantity === 1)
            setQuantity(quantity);
        else {
            setQuantity(quantity - 1);
            setPrice(-props.product_price);
            updateCartItem(props.product_id, quantity, -1);
        }

    }
    const increase = () => {
        // setQuantity(quantity + 1)
        if (quantity > 0 && quantity < stock[1])
            if (quantity < 3) {
                setQuantity(quantity + 1);
                setPrice(props.product_price);
                updateCartItem(props.product_id, quantity, 1);
            }
            else { 
                notification('You can phurcase only three quantities.');
            }
        else{
            notification('There arenot more stocks');
        }
    }

    props.handlePrice(props.product_price * quantity, quantity)
    return (
        <>
            <ToastContainer autoClose={2000} />
            <Desktop className='row'>

                <ItemImage className='col-2'>
                    <LazyLoadImage src={props.product_image} alt='product_image' style={{ maxWidth: '100%', height: 100 }} />
                </ItemImage>

                <ItemText className='col-10'>
                    <ItemName>{props.product_name}</ItemName>
                    <div className='d-flex justify-content-between align-items-end'>
                        <RemoveButton onClick={() => handleRemove(props.product_id, quantity)}>Remove</RemoveButton>
                        <div className='d-flex align-items-center gap-3'>
                            <Quantity style={{ margin: 0 }}>
                                <QButton onClick={decrease} id='decrease'>-</QButton>
                                <QLabel style={{ width: 150 }} id='quantity'>{quantity}</QLabel>
                                <QButton onClick={increase} id='increase'>+</QButton>
                            </Quantity>
                            <ItemPrice>${props.product_price * quantity}</ItemPrice>
                        </div>
                    </div>
                </ItemText>
            </Desktop>
            <Mobile>
                <div className='row'>
                    <div className='col-3'>
                        <ItemImage>
                            <LazyLoadImage src={props.product_image} alt='product_image' style={{ maxWidth: '100%', height: 100 }} />
                        </ItemImage>
                    </div>
                    <ItemText className='col-8'>
                        <ItemName>{props.product_name}</ItemName>
                        <ItemPrice>${props.product_price * quantity}</ItemPrice>
                    </ItemText>

                </div>
                <div className='row'>
                    <div className='col-3 align-items-center d-flex'>
                        <RemoveButton onClick={() => handleRemove(props.product_id, quantity)}>Remove</RemoveButton>
                    </div>
                    <div className='col-9'>
                        <Quantity style={{ margin: 0 }}>
                            <QButton onClick={decrease} id='decrease'>-</QButton>
                            <QLabel style={{ width: 150 }} id='quantity'>{quantity}</QLabel>
                            <QButton onClick={increase} id='increase'>+</QButton>
                        </Quantity>
                    </div>
                </div>
            </Mobile>
        </>
    )
}
export default CartItem;