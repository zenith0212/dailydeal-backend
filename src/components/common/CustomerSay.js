import React, { useEffect } from 'react';
import './customer.sass';
import $ from 'jquery';
import styled from 'styled-components';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const review = {
    size: 30,
    value: 4.5,
    edit: false
};

const YTitle = styled.h1`
    padding: 36px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    border-bottom: 1px solid #D2DBE3;
    margin-top:100px;
    display:flex;
    justify-content: space-between;
    @media screen and (max-width: 768px){
        font-size: 24px;
        line-height: 33px;
        margin-top: 10px;
        padding: 24px 0;
    }
`
const SlideButton = styled.button`
    border:none;
    background:transparent;
    color: #12753B;
`
const Slide = styled.div`
    @media screen and (max-width: 768px){
        display: none;
    }
`
const DesktopCustomer = styled.div`
    @media screen and (max-width: 768px){
        display: none;
    }
`
const MobileCustomer = styled.div`
    display: none;
    @media screen and (max-width: 768px){
        display: block;
    }
`
function CustomerSay() {

    const moveToSelected = (element) => {

        if (element == "next") {
            var selected = $(".selected").next();
        } else if (element == "prev") {
            var selected = $(".selected").prev();
        } else {
            var selected = element;
        }

        var next = $(selected).next();
        var prev = $(selected).prev();

        $(selected).removeClass().addClass("selected");

        $(prev).removeClass().addClass("prev");
        $(next).removeClass().addClass("next");


        $(next).nextAll().removeClass().addClass('hideRight');
        $(prev).prevAll().removeClass().addClass('hideLeft');

    }

    $('#carousel div').click(function () {

        moveToSelected($(this));
    });


    const handleNext = () => {
        moveToSelected('next')
    }

    const handlePrev = () => {
        moveToSelected('prev')
    }

    return (
        <>
            <div className='container'>

                <YTitle>
                    <label>Pervious Daily Deals</label>
                    <Slide className="buttons">
                        <SlideButton onClick={handlePrev} className="leftLst"><MdKeyboardArrowLeft size={25} /></SlideButton>
                        <SlideButton onClick={handleNext} className="rightLst"><MdKeyboardArrowRight size={25} /></SlideButton>
                    </Slide>
                </YTitle>
            </div>
            <DesktopCustomer id="carousel">

                <div className="hideLeft">
                    <LazyLoadImage src="/images/customer_say1.png" />
                </div>

                <div className="prev">
                    <LazyLoadImage src="/images/customer_say1.png" />
                </div>

                <div className="selected">
                    <LazyLoadImage src="/images/customer_say1.png" />
                </div>

                <div className="next">
                    <LazyLoadImage src="/images/customer_say1.png" />
                </div>

                <div className="hideRight">
                    <LazyLoadImage src="/images/customer_say1.png" />
                </div>
            </DesktopCustomer>
            <div className='container'>
                <MobileCustomer>
                    <Swiper className="mySwiper">
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                        <SwiperSlide><LazyLoadImage src="/images/customer_say1.png" /></SwiperSlide>
                    </Swiper>
                </MobileCustomer>
            </div>
        </>
    );
}
export default CustomerSay;
