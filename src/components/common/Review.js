import React, { useState, useEffect } from "react";
import { ReactComponent as Loading } from '../../asset/Gear.svg';
import moment from 'moment';
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { CancelButton, CommonLabel, Input, SaveButton, SubscribeButton } from "../Store/StyledCom";
import { base_url } from "../../config/config";
import Cookies from 'universal-cookie';
import Login from "../Auth/Login";
import { Rate } from "rsuite";
import formatDate from "./FormatDate";
import { notification } from "../../actions/notificantion";
import { ToastContainer } from "react-toastify";
import useCart from "../../hooks/useCart";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const review = {
    size: 30,
    value: 4.5,
    edit: false,
    activeColor: '#355E3B'
};
const review1 = {
    size: 20,
    value: 5,
    edit: false,
    activeColor: '#355E3B'
};

const DetailTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
    padding: 40px 0;
    border-bottom: 1px solid #D2DBE3;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px){
        display: block;
    }
`
const ReviewMark = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #717171;
    margin-bottom:0;
    display: flex;
    align-items: center;
`

const WriteButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #355E3B;
    border: 1.5px solid #355E3B;
    border-radius: 4px;
    width: 241px;
    height: 60px;
    @media screen and (max-width:768px){
        width: 100%;
    }
`
const CardName = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #212121;
    margin-bottom: 0;
`
const CardContent = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #4D4D4D;
    margin: 20px 0;
`
const CardContainer = styled.div`
    border: 1px solid #D2DBE3;
    filter: drop-shadow(0px 2px 4px rgba(171, 190, 209, 0.6));
    padding: 28px 16px;
`
const MoreButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    padding: 18px 35.5px;
    color: #355E3B;
    border: 1px solid #355E3B;
    border-radius: 4px;
    @media screen and (max-width:768px){
        display: none;
    }
`
const DesktopReviews = styled.div`
    @media screen and (max-width: 768px){
        display: none;
    }
`
const MobileReviews = styled.div`
    display: none;
    @media screen and (max-width: 768px){
        display: block;
    }
`
const ReviewSort = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    @media screen and (max-width: 768px){
        display: none;
    }
`
function ReviewCard(props) {
    // const [content, setContent] = useState('');
    const [duration, setDuration] = useState();

    let content = props.contents + ''
    var shownTime;
    if (content !== undefined) {
        if (content.length > 100) {
            content = content.substr(0, 100) + '...';
            // console.log('>>>', content)
        }
    }

    useEffect(() => {
        const today = new Date();
        const duration = moment.duration(moment(today).diff(props.createAt));
        shownTime = duration.years() !== 0 ?
            duration.years() + "year(s) ago" : (
                duration.months() !== 0 ?
                    duration.months() + "month(s) ago" : (
                        duration.days() !== 0 ?
                            duration.days() + "day(s) ago" : (
                                duration.hours() !== 0 ?
                                    duration.hours() + "hour(s) ago" : (
                                        duration.minutes() !== 0 ?
                                            duration.minutes() + "minute(s) ago" :
                                            duration.seconds() + "seconds ago"
                                    )
                            )
                    )
            );
        setDuration(shownTime)
    }, [])


    return (
        <CardContainer>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                    <LazyLoadImage src="/images/review_avatar.png" alt="avatar" style={{ width: 50, clipPath: 'circle()' }} />
                    <CardName>{props.name}</CardName>
                </div>
                <CardContent>{duration}</CardContent>
            </div>
            <Rate readOnly allowHalf defaultValue={props.mark} color='green' />
            <div className="d-grid" style={{ height: 120 }}>
                {/* <label>-a month ago</label> */}
                <CardContent className="text-break">{content}</CardContent>
            </div>
        </CardContainer>
    )
}
const cookies = new Cookies();

function Review(props) {
    const [loading, setLoading] = useState(true);
    const [showReview, setShowReview] = useState(false);
    const [name, setName] = useState();
    const [mark, setMark] = useState();
    const [contents, setContents] = useState();
    const [showLogin, setShowLogin] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [averageMark, setAverageMark] = useState(0);
    const { setReviewCount } = useCart();

    var prouduct_name = props.product_name;
    const reviewClose = () => setShowReview(false);
    const token = cookies.get('TOKEN')

    const closeLogin = () => setShowLogin(false);

    const reviewShow = () => {
        if (!token) {
            setShowLogin(true)
        }
        else {
            setShowReview(true);
        }
    }
    const today = new Date();

    const submitReview = () => {
        const config = {
            method: 'post',
            url: base_url + 'review',
            data: {
                email: localStorage.getItem('email'),
                name: name,
                product_name: props.product_name,
                contents: contents,
                mark: mark,
                date: formatDate(today)
            }
        }
        axios(config)
            .then((result) => {
                notification(result.data.message);
            })

        reviewClose();
    }

    const getReviews = async () => {
        if (prouduct_name) {
            await axios({ method: 'get', url: base_url + 'review', params: { product_name: prouduct_name } })
                .then((result) => {
                    let sum = 0.0;
                    // var item
                    setReviewList(result.data);
                    setReviewCount(result.data.length);
                    for (var i = 0; i < result.data.length; i++) {
                        // item = result.data[i].mark
                        sum += result.data[i].mark
                    }
                    // console.log("======>",sum);
                    console.log(sum , result.data.length)
                    setAverageMark(result.data.length ? sum / result.data.length : 0);
                    setLoading(false);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
    useEffect(() => {
        getReviews();

    }, [prouduct_name])
    console.log(typeof averageMark, Math.round(averageMark), averageMark.toFixed(2))
    return (
        <div>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <ToastContainer autoClose={2000} />
                        <DetailTitle>
                            <div className="">
                                <label>Costomer Reviews</label>
                                <div className="d-flex">
                                    <Rate readOnly allowHalf defaultValue={averageMark ? Math.round(averageMark) : 0} color='green' />
                                    <ReviewMark>{averageMark ? averageMark.toFixed(2) : 0}/5</ReviewMark>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <WriteButton onClick={reviewShow}>Write Review</WriteButton>
                            </div>
                        </DetailTitle>
                        {
                            reviewList.length === 0 ?
                                <div></div>
                                :
                                <ReviewSort>
                                    <label>1-{reviewList.length} of {reviewList.length} Reviews</label>
                                    <div className="d-flex gap-3 align-items-center">
                                        <label>Sort by</label>
                                        <select name="cars" id="cars" className="p-2">
                                            <option value="volvo">Most Relevant </option>
                                            <option value="saab">Saab</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                </ReviewSort>
                        }
                        <DesktopReviews className="row">
                            {
                                reviewList.length === 0 ?
                                    <h3>There are not reviews for this product.</h3>
                                    :
                                    reviewList.map((item) => (
                                        <div className="col-sm-4 my-2" key={item._id}>
                                            <ReviewCard {...item} />
                                        </div>
                                    ))
                            }

                        </DesktopReviews>
                        <MobileReviews>
                            <Swiper className="mySwiper">
                                {
                                    reviewList.length === 0 ?
                                        <h3>There are not reviews for this product.</h3>
                                        :
                                        reviewList.map((item) => (
                                            <SwiperSlide key={item._id}><ReviewCard {...item} /></SwiperSlide>
                                        ))
                                }

                            </Swiper>
                        </MobileReviews>
                        <div className='d-flex justify-content-center my-4'>
                            <MoreButton>Show More</MoreButton>
                        </div>

                        <Modal show={showReview} onHide={reviewClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>You're Reviewing</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CommonLabel>Name</CommonLabel>
                                <div style={{ height: 60 }}>
                                    <Input type='text' name="name" onChange={(e) => setName(e.target.value)} placeholder="Joh Smith" />
                                </div>

                                <CommonLabel><Rate color="green" allowHalf onChange={(e) => setMark(e)} /> Satisfactory</CommonLabel>

                                <CommonLabel>Review</CommonLabel>
                                <textarea name="review_contents" onChange={(e) => setContents(e.target.value)} rows={5} className='w-100' />
                            </Modal.Body>
                            <Modal.Footer className="justify-content-start">
                                <SaveButton onClick={submitReview} className='h-auto w-auto p-2'>
                                    Submit Review
                                </SaveButton>
                                <CancelButton className="h-auto w-auto p-2 border-0" onClick={reviewClose}>
                                    Cancel
                                </CancelButton>
                            </Modal.Footer>
                        </Modal>

                        <Login showLogin={showLogin} closeLogin={closeLogin} />
                    </>
            }
        </div >

    )
}

export default Review;