import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdOutlineFavorite } from 'react-icons/md';
import { BsShare } from 'react-icons/bs';
import { RiStarSmileLine } from 'react-icons/ri';
import ReactSwipableView from 'react-swipeable-views';
import AboutProduct from '../common/aboutProduct';
import Review from '../common/Review';
import Banner from '../HomePage/banner';
import formatDate from '../common/FormatDate';
import SearchTime from '../common/SearchTime';
import { PrePrice, PriceShower, QButton, QLabel, Quantity, CartButton, BuyButton, CommonLabel, LinkH, HLinkContainer, ProductHeader, CheckButton, WishButton } from '../Store/StyledCom';
import MoreDeal from '../common/moreDeal';
import YesterdayItem from '../ProductItem/yItem';
import axios from 'axios';
import { base_url } from '../../config/config';
import TodayMarker from '../common/TimeMarker/todayMarker';
import YesterdayMarker from '../common/TimeMarker/yesterdayMarker';
import { SelectPicker } from 'rsuite';
import { notification } from '../../actions/notificantion';
import { ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import Login from '../Auth/Login';
import ReactGA from 'react-ga';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const cookies = new Cookies();

const ShipDetail = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #4D4D4D;
`

const VisitorDes = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #89939E;
    margin-bottom: 0px;
`
const ProductName = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
`
const ReviewDes = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #355E3B;
    margin-bottom:0;
`
const DetailsTop = styled.div`
    padding-top: 70px;
    @media screen and (max-width:768px){
        padding: 0;
    }
`
const ThumbImg = styled.img`
    max-width: 100%;
    height: 85px;
    @media screen and (max-width: 768px){
        width: 65px;
        height: 65px;
    }
`
const DetailsYesterday = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px){
        display: block;
    }
    `
function ProductDetails({ yTime }) {

    const [visitors, setVisitors] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [yesterdayDeals, setYesterdayDeals] = useState([]);
    const [productDetail, setProductDetail] = useState();
    const [yflag, setYflag] = useState(false);
    const [variantArray, setVariantArray] = useState([{ attributes: [{ option: 'aa' }], stock_quantity: 2 }]);
    // const [variation, setVariantion] = useState();
    const [variations, setVariations] = useState([{ attributes: [{ option: 'aa' }], stock_quantity: 2 }]);
    const [variationIDStock, setVariationIDStock] = useState();
    const [showLogin, setShowLogin] = useState(false);

    const { reviewCount, setCount, setPrice, ydeal_available } = useCart();

    const closeLogin = () => setShowLogin(false);
    var product_name;
    var yTime = (flag) => {
        setYflag(flag);
    }

    const yesterday = new Date();
    const location = useLocation();
    yesterday.setDate(yesterday.getDate() - 1);

    window.kkk = location

    var v_items = [];

    const getProductDetail = async () => {
        const configDetail = {
            method: 'get',
            url: `https://nova.shopwoo.com/api/v1/products/${location.state.data}?store_id=2&lang=en`,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        };
        const result = await axios(configDetail);
        product_name = result.data.name;
        setProductDetail(result.data);
        setVariations(result.data.variations);

        for (var i in result.data.variations) {
            var item = result.data.variations[i];
            // if (item.stock_quantity !== 0) {
                v_items.push({
                    label: item.attributes[0].option + "   " + item.stock_quantity + "    in stock",
                    value: [item.id, item.stock_quantity],
                    role: 'Master'
                });
            // }
        }
        window.temp = result
        setVariantArray(v_items);
        setVariationIDStock(v_items[0].value);

    }
    const configVisitors = {
        method: 'get',
        url: base_url + 'visitors'
    }
    const getVisitors = async () => {        
        const result = await axios(configVisitors)
        setVisitors(result.data.currentVisitors)
        // console.log(result);
        console.groupEnd()
        setTimeout(() => {
            getVisitors(); 
        }, 4000);
    }
    useEffect(() => {
        // const configVisitors = {
        //     method: 'get',
        //     url: base_url + 'visitors'
        // }
        getVisitors() 
        // setInterval(async () => {
        //     console.group("getting visitors");
        //     axios(configVisitors)
        //     .then((result) => {
        //         setVisitors(result.data.currentVisitors)
        //         console.log(result);
        //         console.groupEnd()
        //     });
        // }, 4000)        
    }, [])
    useEffect(() => {

        // ReactGA.pageview(window.location.pathname + window.location.search);

        getProductDetail();

        const configY = {
            method: 'post',
            url: base_url + 'deals/yesterday',
            data: {
                post_date: formatDate(yesterday)
            }
        }
        axios(configY)
            .then((result) => {
                setYesterdayDeals(result.data);
                console.log(result.data);
            });

    }, [formatDate(yesterday)]);


    const onClickIndex = (i) => {
        setCurrentIndex(i);
    };


    const decrease = () => {
        if (quantity === 1)
            setQuantity(quantity);
        else
            setQuantity(quantity - 1);
    }
    const increase = () => {
        if (quantity > 0 && quantity < variationIDStock[1])
            if (quantity < 3)
                setQuantity(quantity + 1);
            else {
                notification('You can phurcase only three quantities.');
            }

    }

    const addToCart = (product_id, product_image, product_name, product_price, product_quantity) => {

        const data = {
            product_id: product_id,
            variant: variationIDStock,
            product_image: product_image,
            product_name: product_name,
            product_price: product_price,
            product_quantity
        };

        var cart_items = cookies.get('cart_items');
        if (cart_items === undefined) {
            let temp = [];
            temp.push(data);
            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            });
            notification("You added this product successfully!!!");
            setCount(1);
            setPrice(product_price * product_quantity);
        } else {
            let index = cart_items.findIndex(i => { return i.product_id == product_id });
            console.log(cart_items);
            if (index === -1) {
                cart_items.push(data);
                cookies.set('cart_items', cart_items, {
                    path: "/",
                    maxAge:3600
                });
                notification("You added this product successfully!");
                setCount(1);
                setPrice(product_price * product_quantity);
            } else {
                notification("You already added this product!");
            }
        }
    };

    const buyNow = (product_id, product_image, product_name, product_price, product_quantity) => {
        const data = {
            product_id: product_id,
            variant: variationIDStock,
            product_image: product_image,
            product_name: product_name,
            product_price: product_price,
            product_quantity
        };

        var cart_items = cookies.get('cart_items');
        if (cart_items === undefined) {
            let temp = [];
            temp.push(data);
            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            });
        } else {
            cookies.remove('cart_items');
            let temp = [];
            temp.push(data);

            cookies.set('cart_items', temp, {
                path: '/',
                maxAge:3600
            })
        }
    }
    const changeVariant = (e) => {
        setQuantity(1);
        setVariationIDStock(e);
    }

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
                    notification(result.data.message)
                })
        }
        else {
            setShowLogin(true);
        }
    }

    return (
        <>
            <ToastContainer autoClose={2000} />
            <DetailsTop>
                <SearchTime back={false} />
            </DetailsTop>
            <div className='container'>
                <HLinkContainer>
                    <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
                </HLinkContainer>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div>
                            <div className='d-flex gap-1'>
                                <LazyLoadImage src='/images/ri-bus-2-line.png' alt='shipping image' style={{ width: 20, height: 19 }} />
                                <ShipDetail>Ship free, no order min* As often as you need.</ShipDetail>
                            </div>
                            <div className="product-carousel">
                                <div className="carousel-wrapper">
                                    <ReactSwipableView index={currentIndex}>
                                        {productDetail && productDetail.images.map((item) => (
                                            <div className='d-flex justify-content-center' style={{ height: 700 }} key={item.position}>
                                                <LazyLoadImage alt={item.alt} style={{ maxWidth: '100%', maxHeight: '100%' }} src={item.src} />
                                            </div>
                                        ))}
                                    </ReactSwipableView>
                                </div>
                            </div>

                            <div className="product-preview-slides row">
                                {productDetail && productDetail.images.map((item, i) => (
                                    <div
                                        className="product-preview-image-wrapper image_button col-2"
                                        key={item.position}
                                        onClick={() => onClickIndex(i)}
                                    >
                                        <div className='border w-100 d-flex'>
                                            <ThumbImg
                                                className='m-auto'
                                                src={item.src}
                                                alt='product_image' />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        {/* <BiDislike /><label>Report incorrect product information</label> */}
                    </div>
                    <div className='col-sm-5'>
                        <div className='d-flex justify-content-between'>

                            {
                                location.state.type == 'today' ?
                                    <TodayMarker /> :
                                    (location.state.type == 'yesterday' ?
                                        <YesterdayMarker yTime={yTime} /> : <div></div>)

                            }

                            <div className='d-flex gap-3'>
                                <div>
                                    <BsShare size={25} />
                                </div>
                                {location.state.type == 'wishlist' ?
                                <div style={{ color: '#355E3B', cursor:"pointer" }} onClick={() => addWishList(productDetail.id)}>
                                    <MdOutlineFavorite size={25} />
                                </div>:
                                null
                                }
                            </div>
                        </div>
                        <div className='my-4'>
                            <LazyLoadImage src='/images/user.png' alt='user' width={24} height={24} />
                            <VisitorDes>{visitors} Visitors are browsing this deal</VisitorDes>
                        </div>
                        <div>
                            <ProductName>{productDetail && productDetail.name}</ProductName>
                        </div>
                        <div className='d-flex gap-2 my-3'>
                            <RiStarSmileLine size={20} /><ReviewDes>{reviewCount} reviews</ReviewDes>
                        </div>
                        <div className='d-flex my-4 justify-content-between'>
                            <div className='d-flex gap-3'>
                                <PriceShower>${productDetail && location.state.price}</PriceShower>
                                <PrePrice>${productDetail && productDetail.variations[0].regular_price}</PrePrice>
                            </div>
                            {
                                location.state.type == 'today' ?
                                <SelectPicker data={variantArray} onChange={changeVariant} block searchable={false} placeholder={variantArray[0].label} />
                                :null
                            }
                            </div>
                        {
                            location.state.type == 'today' ?
                            <Quantity>
                                <QButton onClick={decrease} id='decrease'>-</QButton>
                                <QLabel id='quantity'>{quantity}</QLabel>
                                <QButton onClick={increase} id='increase'>+</QButton>
                            </Quantity>
                            :null
                        }
                        {
                            location.state.type == 'mywishlist' ?
                            null
                            :
                            location.state.type == 'wishlist' ?
                            null
                            :
                            location.state.type == 'gateway' ?
                            null
                            :
                            location.state.type == 'today' ?
                            <CommonLabel>
                                <BsClock /><label className='ml-2 mb-0'>{Math.floor(location.state.leftTime/3600)} hours left to buy or until sold out</label>
                            </CommonLabel>
                            :
                            null
                        }

                        <div className='row'>
                            {
                                location.state.type == 'wishlist' ?
                                    <div className='col-12'>
                                        <WishButton onClick={() => addWishList(productDetail.id)}>Add to WishList</WishButton>
                                    </div> :

                                    location.state.type == 'mywishlist' ?
                                    null
                                    :

                                    location.state.type == 'gateway' ?
                                    null
                                    :

                                    (location.state.type === 'today' || ydeal_available ?
                                        <>
                                            <div className='col-6'>
                                                <CartButton
                                                    onClick={() => { addToCart(productDetail.id, productDetail.images[0].src, productDetail.name, location.state.price, quantity) }}
                                                >Add to Cart
                                                </CartButton>
                                            </div>

                                            <div className='col-6'>
                                                <Link to='/checkout' state={{ quantity: [quantity], data: location.state.price * quantity }}>
                                                    <BuyButton
                                                        onClick={() => { buyNow(productDetail.id, productDetail.images[0].src, productDetail.name, location.state.price, quantity) }}
                                                    >Buy it Now
                                                    </BuyButton>
                                                </Link>
                                            </div>
                                        </> : null)
                            }

                        </div>

                        <div>
                            <LazyLoadImage src='/images/payment_list.png' alt='payment_list' className='w-100' />
                        </div>
                    </div>
                </div>
                <AboutProduct about={productDetail && productDetail.description} />
            </div>
            <Banner />
            <MoreDeal />
            <div className='container'>
                <Review product_name = {productDetail && productDetail.name} />

                <ProductHeader>
                    <label>Missed yesterday’s deal?</label>
                </ProductHeader>
                {/* <YesterdayItem day={yesterdaydeals} flag={yflag} /> */}
                <DetailsYesterday>
                    {
                        yesterdayDeals.map((item) => (
                            <YesterdayItem key={item.product_id} {...item} />
                        ))
                    }
                </DetailsYesterday>
            </div>
            <Login showLogin={showLogin} closeLogin={closeLogin} />
        </>
    )
}
export default ProductDetails;