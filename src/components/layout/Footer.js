import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SubscribeButton, SubscribeInput } from "../Store/StyledCom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    &:hover {
        color: #fff;
    }
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #212121;
    margin-bottom: 5px;
    @media screen and (max-width: 768px){
        font-size: 13px;
        line-height: 27px;
    }
`
const FooterTitle = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 36px;
    color: #212121;
    margin-bottom: 39px;
    @media screen and (max-width: 768px){
        font-size: 14px;
        line-height: 36px;
        margin-bottom: 0px;
    }
`
const FooterContainter = styled.div`
    background: #F1E20F;
    padding: 80px 120px 50px;
    @media screen and (max-width: 768px){
        padding: 25px;
    }
`
const CopyRight = styled.div`
    display:flex;
    justify-content: space-between;
    @media screen and (max-width: 768px){
        display: block;
    }
`
const CopyRightText = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: capitalize;
    color: #212121;
`
const CopyRightImage = styled.div`
    display: flex;
    align-items: end;
`
function Footer() {
    return (

        <FooterContainter>
            <div className="row">
                <div className="col-4 col-sm-2 d-grid p-1">
                    <FooterTitle>DailyDeal.io</FooterTitle>
                    <FooterLink>About Us</FooterLink>
                    <FooterLink>Careers</FooterLink>
                    <FooterLink to="/helpcenter">FAQ</FooterLink>
                    <FooterLink>Write Us</FooterLink>
                </div>
                <div className="col-4 col-sm-2 d-grid p-1">
                    <FooterTitle>Customer Care</FooterTitle>
                    <FooterLink>Customer Service</FooterLink>
                    <FooterLink>dailydeal's Return Policy</FooterLink>
                    <FooterLink>Product Warranty</FooterLink>
                    <FooterLink>Product Recall Notices</FooterLink>
                </div>
                <div className="col-4 col-sm-2 d-grid p-1">
                    <FooterTitle>Community</FooterTitle>
                    <FooterLink>Facebook</FooterLink>
                    <FooterLink>Twitter</FooterLink>
                    <FooterLink>Instagram</FooterLink>
                    <FooterLink>Developer Portal</FooterLink>
                </div>
                <div className="col-sm-6 d-grid">
                    <FooterTitle>Join our VIP Club</FooterTitle>
                    <FooterLink>Get exclusive access to special offers, free giveaways, and once-in-a-lifetime deals.</FooterLink>
                    <div style={{ height: 48 }}>
                        <SubscribeInput className="px-2" type='email' name='subscribe' placeholder="Type here your Email" />
                        <SubscribeButton>Subscribe</SubscribeButton>
                    </div>
                </div>
            </div>
            <CopyRight>
                <CopyRightText>Dailydeal logos, site design, & content © dailydeal.com LLC 2004-2023. All Rights Reserved.</CopyRightText>
                <CopyRightImage>
                    <LazyLoadImage src="/images/payment_card.png" alt="payment" />
                </CopyRightImage>
            </CopyRight>
        </FooterContainter>
    )
}
export default Footer;