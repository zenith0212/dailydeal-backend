import React, { useEffect } from 'react';
import styled from 'styled-components';


const BannerContainer = styled.div`
    background: #F5F7FA;
    height: 112px;
    display: flex;
    align-items: center;
    @media screen and (max-width:768px){
        height: auto;
        padding: 20px 12px;
    }
`

const BannerImage = styled.img`
    width: 40px;
    height: 40px;
`
const BannerTitle = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    color: #355E3B;
    margin-bottom:0px;
`
const BannerDescription = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #4D4D4D;
`
const banner_items = [
    {
        id: 0,
        icon_url: '/images/ri-bus-2-line.png',
        banner_title: "SHIPPING CHARGES",
        banner_description: 'Flat Charges: PKR 99 on all orders'
    },
    {
        id: 1,
        icon_url: '/images/watch.png',
        banner_title: "SUPPORT 24/7",
        banner_description: 'Contact us 24 hours a day, 7 days a week'
    },
    {
        id: 2,
        icon_url: '/images/pin-drop.png',
        banner_title: "TRACK YOUR ORDER",
        banner_description: 'Track your order for quick updates'
    },
    {
        id: 3,
        icon_url: '/images/account-balance-wallet.png',
        banner_title: "Money Back Guarantee",
        banner_description: 'Please view the return and exchange policy'
    },
]
function Banner() {

    return (
        <BannerContainer>
            <div className='container'>
                <div className='row'>
                    {
                        banner_items.map((item) => (
                            <div key={item.id} className='col-sm-3 d-flex align-items-center my-2 gap-2'>
                                <BannerImage src={item.icon_url} alt='banner_icon' />
                                <div className='d-block'>
                                    <BannerTitle>{item.banner_title}</BannerTitle>
                                    <BannerDescription>{item.banner_description}</BannerDescription>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </BannerContainer>
    )
}
export default Banner;