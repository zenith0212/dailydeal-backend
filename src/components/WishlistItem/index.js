import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import axios from 'axios';
import { base_url } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishButton } from '../Store/StyledCom';
import Login from '../Auth/Login';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const WishListPrice = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    display: flex;
    align-items: center;
    color: #355E3B;
`
const WishListSubPrice = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-decoration-line: line-through;
    color: #717171;
    margin-left: 10px;
`

const WishName = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #4D4D4D;
    text-align: left;
    text-decoration: none;
`

const MissedLabel = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-decoration-line: line-through;
    color: #212121;
    text-align: left;
    margin: 10px 0;
`


const cookies = new Cookies();
function WishListItem(props) {

    const notify = (message) => toast(message);
    const [showLogin, setShowLogin] = useState(false);

    const closeLogin = () => setShowLogin(false);

    const navigate = useNavigate();
    useEffect(() => {
        $(document).ready(function () {
            var itemsMainDiv = ('.MultiCarousel');
            var itemsDiv = ('.MultiCarousel-inner');
            var itemWidth = "";

            $('.leftLst, .rightLst').click(function () {
                var condition = $(this).hasClass("leftLst");
                if (condition)
                    click(0, this);
                else
                    click(1, this)
            });

            ResCarouselSize();

            $(window).resize(function () {
                ResCarouselSize();
            });

            //this function define the size of the items
            function ResCarouselSize() {
                var incno = 0;
                var dataItems = ("data-items");
                var itemClass = ('.item');
                var id = 0;
                var btnParentSb = '';
                var itemsSplit = '';
                var sampwidth = $(itemsMainDiv).width();
                var bodyWidth = $('body').width();
                $(itemsDiv).each(function () {
                    id = id + 1;
                    var itemNumbers = $(this).find(itemClass).length;
                    btnParentSb = $(this).parent().attr(dataItems);
                    itemsSplit = btnParentSb.split(',');
                    $(this).parent().attr("id", "MultiCarousel" + id);


                    if (bodyWidth >= 1200) {
                        incno = itemsSplit[3];
                        itemWidth = sampwidth / incno;
                    }
                    else if (bodyWidth >= 992) {
                        incno = itemsSplit[2];
                        itemWidth = sampwidth / incno;
                    }
                    else if (bodyWidth >= 768) {
                        incno = itemsSplit[1];
                        itemWidth = sampwidth / incno;
                    }
                    else {
                        incno = itemsSplit[0];
                        itemWidth = sampwidth / incno;
                    }
                    $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
                    $(this).find(itemClass).each(function () {
                        $(this).outerWidth(itemWidth);
                    });

                    $(".leftLst").addClass("over");
                    $(".rightLst").removeClass("over");

                });
            }


            //this function used to move the items
            function ResCarousel(e, el, s) {
                var leftBtn = ('.leftLst');
                var rightBtn = ('.rightLst');
                var translateXval = '';
                var divStyle = $(el + ' ' + itemsDiv).css('transform');
                var values = divStyle.match(/-?[\d]+/g);
                var xds = Math.abs(values[4]);
                if (e === 0) {
                    translateXval = parseInt(xds) - parseInt(itemWidth * s);
                    $(el + ' ' + rightBtn).removeClass("over");

                    if (translateXval <= itemWidth / 2) {
                        translateXval = 0;
                        $(el + ' ' + leftBtn).addClass("over");
                    }
                }
                else if (e === 1) {
                    var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
                    translateXval = parseInt(xds) + parseInt(itemWidth * s);
                    $(el + ' ' + leftBtn).removeClass("over");

                    if (translateXval >= itemsCondition - itemWidth / 2) {
                        translateXval = itemsCondition;
                        $(el + ' ' + rightBtn).addClass("over");
                    }
                }
                $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
            }

            //It is used to get some elements from btn
            function click(ell, ee) {
                var Parent = "#" + $(ee).parent().attr("id");
                var slide = $(Parent).attr("data-slide");
                ResCarousel(ell, Parent, slide);
            }

        });
    }, [])


    const token = cookies.get('TOKEN');
    const user_email = localStorage.getItem('email');

    const addWishList = (id) => {
        // alert("wishlist");
        const config = {
            method: 'post',
            url: base_url + 'wishlist/add',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                product_id: id,
                token: token,
                email: user_email
            }
        }
        
        if (token) {
            axios(config)
                .then((result) => {
                    notify(result.data.message);
                })
        }
        else {
            setShowLogin(true);
        }
    }

    return (

        <div className='item'>
            <div className='my-4'>
                <div className='d-flex justify-content-center' style={{ height: 200 }}>
                    <LazyLoadImage src={props.product_image} alt='today_deal' className='h-100' style={{ maxWidth: '100%' }} />
                </div>

                <div className='d-flex align-items-center mt-4 '>
                    <WishListPrice>${props.sale_price}</WishListPrice>
                    <WishListSubPrice>${props.sale_price}</WishListSubPrice>
                </div>
                <WishName to={'/products/' + props.product_name} state={{data: props.product_id, type: 'wishlist', price: props.sale_price}}>
                    {props.product_name} 
                </WishName>
                <MissedLabel>You missed the Deal</MissedLabel>
                <div className='d-flex justify-content-start'>
                    <WishButton onClick={() => addWishList(props.product_id)}>Add to WishList</WishButton>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
            <Login showLogin={showLogin} closeLogin={closeLogin} />
        </div>

    )
}
export default WishListItem;