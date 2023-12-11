import React from 'react';
import CountdownTimer from '../common/countdown/CountdownTimer';
import MoreDeal from '../common/moreDeal';
import ContactCard from '../common/contactCard';
import styled from 'styled-components';
import SearchBarView from '../HomePage/SearchBarView';

const cartegory_list = [
    {
        id: 0,
        title: "Orders",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    },
    {
        id: 1,
        title: "Shipping & Delivery",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    },
    {
        id: 2,
        title: "Returns",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    },
    {
        id: 3,
        title: "Account & Credit Card",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    },
    {
        id: 4,
        title: "Checkout Help",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    },
    {
        id: 5,
        title: "Pricing & Promotions",
        description: "View My Orders. What Is The Status Of My Online Order? How Can I Change Or Cancel My Order?",
        buttonName: "View More"
    }
];

const HomeHeader = styled.div`
    background: #F5F7FA;
    height: 390px;
    padding-top: 70px;
    margin:auto;

`
const MainTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 58px;
    display: flex;
    align-items: center;
    color: #212121;
    justify-content:center;
    margin:80px 0 15px;
`
const SearchButton = styled.button`
    width: 250px;
    background: #355E3B;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    justify-content:center;
    align-items: center;
    color: #FFFFFF;
    height:100%;
    border: none;
`
function HelpCenter() {


    return (
        <div>
            <HomeHeader>
                <MainTitle>Help Center</MainTitle>
                <div className='d-flex justify-content-center' style={{ height: 50 }}>
                    <SearchBarView title="Search for a product"/><SearchButton>Search</SearchButton>
                </div>
            </HomeHeader>
            <div className="container">
                <MainTitle style={{ margin: '95px 0' }}>Browse help categories</MainTitle>
                <div className="row">
                    {
                        cartegory_list.map((item) => (
                            <div className="col-sm-4 my-3" key={item.id}>
                                <ContactCard {...item} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default HelpCenter;