import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import { ProductHeader, SlideButton } from '../Store/StyledCom';
import WishListItem from '../WishlistItem';
import formatDate from '../common/FormatDate';
import axios from 'axios';
import { base_url } from '../../config/config';


const MobilePreVious = styled.div`
    display: none;
    @media screen and (max-width:768px){
        display: block;
    }
`
const DesktopPreVious = styled.div`
    @media screen and (max-width: 768px){
        display: none;
    }
`
function PreviousSwipe() {

    const [previousDeals, setPreviousDeals] = useState([]);

    const [yflag, setYflag] = useState(false);
    var yTime = (flag) => {
        setYflag(flag);
    }
    const today = new Date();
    const start_date = new Date();
    const end_date = new Date();
    start_date.setDate(today.getDate() - 8);
    end_date.setDate(today.getDate() - 1);

    useEffect(() => {
        const configP = {
            method: 'post',
            url: base_url + 'deals/previous',
            data: {
                start_date: formatDate(start_date),
                end_date: formatDate(end_date)
            }
        }

        axios(configP)
            .then((result) => {
                setPreviousDeals(result.data)
            })

    }, [formatDate(today)]);

    return (
        <>
            <DesktopPreVious className="row">
                <div className="MultiCarousel" data-items="1,2,3,4" data-slide="1" id="MultiCarousel" data-interval="1000">
                    <ProductHeader >
                        <label>Previous Daily Deals</label>
                    </ProductHeader>
                    <SlideButton className="leftLst"><MdKeyboardArrowLeft size={25} /></SlideButton>
                    <SlideButton className="rightLst"><MdKeyboardArrowRight size={25} /></SlideButton>
                    <div className="MultiCarousel-inner">
                        {
                            previousDeals.map((item) => (
                                <div key={item._id}>
                                    <WishListItem {...item} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </DesktopPreVious>
            <MobilePreVious>
                <ProductHeader >
                    <label>Previous Daily Deals</label>
                </ProductHeader>
                {
                    previousDeals.map((item) => (
                        <div key={item._id}>
                            <WishListItem {...item} />
                        </div>
                    ))
                }
            </MobilePreVious>
        </>
    )
}
export default PreviousSwipe;