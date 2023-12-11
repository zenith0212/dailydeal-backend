import React, { useState, useEffect } from 'react';
import { ProfileLabel, ProfileTitle, SummaryTitle, Td, Th } from '../Store/StyledCom';
import Switch from "react-switch";
import Deals from '../ProductItem';
import { IoNotificationsOutline } from 'react-icons/io5';
import WItem from '../ProductItem/wItem';
import axios from 'axios';
import { base_url } from '../../config/config';
import { ReactComponent as Loading } from '../../asset/Gear.svg';

function WishList() {
    const [noti, setNoti] = useState(true);
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState();
    const [loading, setLoading] = useState(true);

    const handleNoti = () => {
        setNoti(!noti);
    }
    const email = localStorage.getItem('email');
    const getProducts = async () => {
        const config = {
            method: 'post',
            url: base_url + 'wishlist',
            data: {
                email: email
            }
        }
        // console.log(config)
        await axios(config).then((res) => {
            console.log(res.data)
            setProducts(res.data);
            setProductCount(res.data.length);
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getProducts();
        // console.log(data)
    }, [])

    // console.log("item", products)
    return (
        <div className='col-sm-9'>
            <div className='my-3 bg-white'>
                <ProfileTitle className='border-bottom p-3'>
                    <label className='d-flex gap-2'>
                        WishList
                        <ProfileLabel className='d-flex m-0 align-items-center'>{productCount + (productCount === 1 ? ' Item' : ' Items')}</ProfileLabel>
                    </label>
                    <div className='d-flex align-items-center'>
                        <IoNotificationsOutline size={25} />
                        <SummaryTitle className='border-0 m-0 p-1'>Notification</SummaryTitle>
                        <Switch onChange={handleNoti} onColor='#355E3B' checked={noti} />
                    </div>
                </ProfileTitle>
                {
                    loading ? <Loading /> :
                        <div className='row p-4'>
                            {
                                products.map((item) => (
                                    // item ===null?<div>Deleted in Dailydeal</div>:
                                    <div className='col-sm-4 my-3' key={item.product_id} >
                                        <WItem {...item} refresh={()=>getProducts()}/>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}
export default WishList;