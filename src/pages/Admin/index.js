import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AdminNav from '../../components/Admin/nav';
import AllProducts from './AllProducts';
import OurProduct from './OurProduct';
import BrandsGateway from './Pagination';
import Orders from './Orders';
import Customers from './Customers';
import Dashboard from './Dashboard';
import Reviews from './Reviews';
import WishList from './WishList';
import Chat from './Chat';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = (props) => {
    const savePrice = () => {

    }
    return (
        <div className='col-sm-3 d-grid my-2' style={{ background: '#ffffff' }}>
            <div className='d-flex justify-content-center' style={{ height: '16rem' }}>
                <Link to={"/" + props.name}>
                    <LazyLoadImage src={props.images[0].src} alt='product_image' className='h-100' style={{ maxWidth: '100%' }} />
                </Link>
            </div>
            <h5>{props.name}</h5>
            {/* <div dangerouslySetInnerHTML={{ __html: props.description }}></div> */}
            <h5>${props.sale_price}</h5>
            <div className='d-flex gap-2'>
                {/* <label>Our price</label> */}
                <input type='number' name='salePrice' />
                <button onClick={savePrice}>Save</button>
                {/* <button>Edit</button> */}
                <button>Cancel</button>
            </div>
        </div>
    )
}
function Admin() {
    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        const configuration = {
            method: 'get',
            url: 'https://nova.shopwoo.com/api/v1/products?store_id=2&per_page=100&stock_status=instock&lang=en',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        };
        axios(configuration)
            .then((result) => {
                setProductList(result.data)
            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    }, [])
    return (
        <div className='container' style={{ paddingTop: 80, background: '#F5F7FA' }}>
            <div className='row'>
                <div className='col-sm-2'>
                    <AdminNav />
                </div>
                <div className='col-sm-10'>
                    <Routes>
                        <Route element={<Dashboard/>} path="/dashboard"/>
                        <Route element={<BrandsGateway />} path="/bransgateways" />
                        <Route element={<OurProduct />} path="/ourproduct" />
                        <Route element={<Orders />} path="/orders" />
                        <Route element={<Customers />} path="/customers" />
                        <Route element={<WishList />} path="/wishlist" />
                        <Route element={<Reviews />} path="/reviews" />
                        <Route element={<Chat />} path="/chat" />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Admin;