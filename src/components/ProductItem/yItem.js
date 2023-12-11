import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsClock, BsShare } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YesterdayTime from '../common/countdown/YesderdayTime';
import { CheckButton, YTimeShower } from '../Store/StyledCom';
import YesterdayMarker from '../common/TimeMarker/yesterdayMarker';

const ProductCard = styled.div`
    width:40%;
    margin: 50px 0;
    
    @media screen and (max-width:768px){
        width: 100%;
    }
`
const ProductImage = styled.img`
    max-width:100%;
    height:100%;
`

const ProductName = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #212121;
    text-decoration: none;
`

const cookies = new Cookies();

function YesterdayItem(props) {

    return (

        <ProductCard>
            <div className='d-flex justify-content-center' style={{ height: 300 }}>
                <ProductImage src={props.product_image} alt='today_deal' />
            </div>
            <div className='d-flex justify-content-between'>
                <YesterdayMarker/>
                <div className='d-flex gap-3 align-items-center'>
                    <div>
                        <BsShare size={20} />
                    </div>
                    <div>
                        <MdOutlineFavoriteBorder size={20} />
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <ProductName to={'/products/'+props.product_name} state={{data: props.product_id, type: 'yesterday', price: props.sale_price}}>{props.product_name}</ProductName>
            </div>
            <Link to={'/products/'+props.product_name} state={{data: props.product_id, type: 'yesterday', price: props.sale_price}}><CheckButton>Check it Out</CheckButton></Link>
        </ProductCard>

    )
}

export default YesterdayItem;