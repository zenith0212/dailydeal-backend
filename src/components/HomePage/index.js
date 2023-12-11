import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Deals from '../ProductItem';
import WishListItem from '../WishlistItem';
import { MdKeyboardArrowLeft, MdReviews } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Banner from './banner';
import MoreDeal from '../common/moreDeal';
import Cookies from 'universal-cookie';
import YesterdayItem from '../ProductItem/yItem';
import formatDate from '../common/FormatDate';
import axios from 'axios';
import CustomerSay from '../common/CustomerSay';
import SearchTime from '../common/SearchTime';
import { ProductHeader, HomeHeader, MainSubTitle, MainTitle, MissedDeal } from '../Store/StyledCom';
import WorkExplain from '../common/WorkExplain';
import PreviousSwipe from '../PreviousDeal/PreviousSwipe';
import { base_url } from '../../config/config';

const HomeContainer = styled.div`

`

const cookies = new Cookies();

const wishlist = [
    {
        id: 0,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 1,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 2,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 3,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 4,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 5,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    }

];


function HomePage() {

    const [todayDeals, setTodayDeals] = useState([]);
    const [yesterdayDeals, setYesterdayDeals] = useState([]);
    const [data, setData] = useState();
    const [leftTime, setLeftTime] = useState(86400);
    
    const [yflag, setYflag] = useState(false);
    var yTime = (flag) => {
        setYflag(flag);
    }
    const today = new Date();
    const yesterday = new Date();
    const beforeyesterday = new Date();

    yesterday.setDate(today.getDate() - 1);
    beforeyesterday.setDate(today.getDate()-2);
    // console.log(today.getDate())
    var configT, configY;
    useEffect(() => {
        const configTime = {
            method: 'get',
            url: base_url + 'time'
        }
        axios(configTime).then((result) => {
            setLeftTime(result.data.leftTime)
            // console.log(result.data.leftTime);
            // console.groupEnd()
        });
    }, [])
    useEffect(() => {
        if(today.getHours() < 8) {
            configT = {
                method: 'post',
                url: base_url + 'deals/today',
                data: {
                    post_date: formatDate(yesterday)
                }
            }
    
            configY = {
                method: 'post',
                url: base_url + 'deals/yesterday',
                data: {
                    post_date: formatDate(beforeyesterday)
                }
            }

        } else{
            configT = {
                method: 'post',
                url: base_url + 'deals/today',
                data: {
                    post_date: formatDate(today)
                }
            }
    
            configY = {
                method: 'post',
                url: base_url + 'deals/yesterday',
                data: {
                    post_date: formatDate(yesterday)
                }
            }
        }

        axios(configT)
            .then((result) => {
                setTodayDeals(result.data);
            })

        axios(configY)
            .then((result) => {
                setYesterdayDeals(result.data);
            })
            .catch(error => {console.log(error)});

    }, [formatDate(today)]);

    return (
        <HomeContainer>
            <HomeHeader>
                <SearchTime back={true}/>
                <div className='container'>

                    <MainTitle>
                        A new <label className='fw-normal'>(incredible!)</label> deal every day.
                    </MainTitle>
                    <MainSubTitle>Great deals on fashion, jewelry and other high-end product from all over the world,</MainSubTitle>
                </div>
            </HomeHeader>

            <div className='container'>
                <ProductHeader>Today Deals</ProductHeader>
                <div className='row'>
                    {
                        todayDeals.length===0?<MainSubTitle>There isn't Today's deals</MainSubTitle>:
                        todayDeals.map((item, index) => (
                            <Deals key={index} {...item} time = {formatDate(today)} leftTime={leftTime}/>
                        ))
                    }
                </div>
                <ProductHeader>
                    Missed yesterday’s deal?
                </ProductHeader>
                {/* <YesterdayItem day={yesterdaydeals} flag={yflag} /> */}
                <MissedDeal className='row'>
                    {
                        yesterdayDeals.length===0?<MainSubTitle>There isn't Yesterday's deals</MainSubTitle>:
                        yesterdayDeals.map((item, index) => (
                            <YesterdayItem key={index} {...item} flag={yflag} />
                        ))
                    }
                </MissedDeal>

                <WorkExplain />
                <PreviousSwipe />
                
            </div>

            <Banner />

            <MoreDeal />
            <div style={{ position: 'relative' }}>
                <CustomerSay />
            </div>
        </HomeContainer>
    )
}
export default HomePage;