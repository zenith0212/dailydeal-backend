import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AdminNav from '../../components/Admin/nav';
import { ToastContainer, toast } from 'react-toastify';
import useInfiniteScroll from './useInfinite';
import { base_url } from '../../config/config';
import { ProductPrice, ProductTitle } from '../../components/Store/StyledCom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const ProductItem = (props) => {

    const [salePrice, setSalePrice] = useState();
    const [postDate, setPostDate] = useState('');
    const dateInputRef = useRef(null);

    const pickDate = (e) => {
        setPostDate(e.target.value);
    };

    const notify = (message) => toast(message);

    const savePrice = () => {

        const configuration = {
            method: 'post',
            url: base_url + 'ourproduct',
            data: {
                id: props.id,
                name: props.name,
                image: props.images[0].src,
                sale_price: salePrice,
                regular_price: props.regular_price,
                post_date: postDate,
            }
        };

        axios(configuration)
            .then((result) => {

                notify(result.data.message);

            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    }


    return (
        <div className='col-sm-3 d-grid my-2'>
            <div className='bg-white p-2'>
                <div className='d-flex justify-content-center' style={{ height: '16rem' }}>
                    <Link to={"/products/" + props.name} state={{ data: props.product_id }}>
                        <LazyLoadImage src={props.images[0].src} alt='product_image' className='h-100' style={{ maxWidth: '100%' }} />
                    </Link>
                </div>
                <ProductTitle>{props.name}</ProductTitle>
                {/* <div dangerouslySetInnerHTML={{ __html: props.description }}></div> */}
                <ProductPrice>${props.sale_price}</ProductPrice>
                <div className='gap-2'>
                    {/* <label>Our price</label> */}
                    <input type='number' name='salePrice' className='w-25' onChange={(e) => setSalePrice(e.target.value)} />
                    <input type='date' onChange={pickDate} ref={dateInputRef} />
                    <button onClick={savePrice}>Save</button>
                    {/* <button>Edit</button> */}
                    {/* <button>Cancel</button> */}
                </div>
            </div>
        </div>
    )
}

const AllProducts = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [isFetching, setIsFetching] = useInfiniteScroll(moreData);

    const loadData = () => {
        const configuration = {
            method: 'get',
            url: 'https://nova.shopwoo.com/api/v1/products?store_id=2&page=1&per_page=24&stock_status=instock&lang=en',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        };
        axios(configuration).then(res => {
            setData(res.data);
        });
    }

    function moreData() {
        // alert("aaa");
        const configuration = {
            method: 'get',
            url: `https://nova.shopwoo.com/api/v1/products?store_id=2&page=${page}&per_page=24&stock_status=instock&lang=en`,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        };

        axios(configuration).then(res => {
            setData([...data, ...res.data]);
            setPage(page + 1)
            setIsFetching(false)
        });
    }
    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        setIsFetching(true)
    }

    useEffect(() => {
        loadData()
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, [])

    useEffect(() => {
        if (isFetching) {
            moreData();
        }
    }, [isFetching]);


    if (data.length == 0) {
        return <h1>Loading...</h1>;
    }

    return (

        <div className='row' style={{ overflowY: 'scroll', height: 700 }} >
            <h2>All products</h2>
            {

                data.map((item, index) => (
                    // console.log("ITem", item)
                    <ProductItem {...item} key={index} />
                ))
            }
            <ToastContainer autoClose={2000} />
        </div>
    )
}
export default AllProducts;