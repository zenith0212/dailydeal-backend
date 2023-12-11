import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GreadDeal = styled.div`
    background: #FCEB00;
    height: 100px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
    justify-content: center;
    @media screen and (max-width: 768px){
        font-size: 20px;
        line-height: 32px;
        display: grid;
        padding: 15px 20px;
        height: auto;
        gap: 20px;
    }
`
const SignupButton = styled.button`
    display: none;
    @media screen and (max-width: 768px){
        display: block;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #355E3B;
        border: 1.5px solid #355E3B;
        border-radius: 4px;
        width: 185px;
        height: 60px;
        background: transparent;
        margin: auto;
    }
    
`

function MoreDeal() {
    return (
        <GreadDeal>
            <label>Want more great deals? <Link to='/signup' className='text-decoration-none' ><strong>Sign up</strong></Link> for our daily Digest emails !</label>
            <SignupButton>Sign up</SignupButton>
        </GreadDeal>
    )
}
export default MoreDeal;