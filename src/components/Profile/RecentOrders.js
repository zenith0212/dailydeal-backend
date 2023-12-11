import React, { useEffect, useState } from 'react';
import { ProfileLabel, ProfileTitle, Td, Th } from '../Store/StyledCom';
import Table from 'react-bootstrap/Table';
import { base_url } from '../../config/config';
import axios from 'axios';
import formatDate from '../common/FormatDate';
import { ReactComponent as Loading } from '../../asset/Gear.svg';

function RecentOrders() {

    const [orderData, setOrderData] = useState([]);
    const [orderCount, setOrderCount] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'get',
            url: base_url + 'orders',
            params: {
                email: localStorage.getItem('email')
                // email: 'steve@newmira.com'
            }
        }

        axios(config)
            .then(async (result) => {
                setOrderData(result.data);
                setOrderCount(result.data.length);

                var orderItem = [];
                for (var i in result.data) {
                    var item = result.data[i];
                    const orderDetail = await getOrderDetail(item.order_id);
                    item = { ...item, status: orderDetail[0], price: orderDetail[1], shipping: orderDetail[2] + " " + orderDetail[3] };
                    orderItem.push(item);

                }
                setOrderData(orderItem);
                setLoading(false)
            })
    }, [])

    const getOrderDetail = async (order_id) => {
        const config = {
            method: 'get',
            url: `https://nova.shopwoo.com/api/v1/orders/${order_id}?store_id=2`,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        }
        var status = '';
        var price, state, city;

        await axios(config)
            .then((result) => {
                status = result.data.status;
                price = result.data.total;
                city = result.data.shipping.city;
                state = result.data.shipping.state
            })

        return [status, price, city, state];
    }
    return (
        <div className='col-sm-9'>
            <div className='my-3 bg-white'>
                <ProfileTitle className='border-bottom p-3 justify-content-start gap-2'>
                    Recent Orders
                    <ProfileLabel className='d-flex m-0 align-items-center'>({orderCount + (orderCount == 1 ? ' Item' : ' Items')})</ProfileLabel>
                </ProfileTitle>
                <div className='px-4 py-2'>
                    {
                        loading ? <Loading />
                            :
                            <div className='table-responsive'>
                                <Table className='table'>
                                    <thead style={{ background: '#F5F7FA', marginTop: 10 }}>
                                        <tr style={{ marginTop: 10 }}>
                                            <Th>ORDER #</Th>
                                            <Th>DATE</Th>
                                            <Th>SHIP TO</Th>
                                            <Th>ORDER TOTAL</Th>
                                            <Th>STATUS</Th>
                                            <Th>ACTION</Th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orderData.map((item) => (
                                                <tr key={item.order_id}>
                                                    <Td>{item.order_id}</Td>
                                                    <Td>{formatDate(item.order_date)}</Td>
                                                    <Td>{item.shipping}</Td>
                                                    <Td>${item.order_amount}</Td>
                                                    <Td>{item.status}</Td>
                                                    <Td>View</Td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default RecentOrders;