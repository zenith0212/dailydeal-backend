import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OrderTable from '../../components/Admin/orderTable';
import SaleGraph from '../../components/Admin/saleGraph';
import Traffic from '../../components/Admin/traffic';
import { ExportButton, ProfileTitle } from '../../components/Store/StyledCom';
import { base_url } from '../../config/config';
import formatDate from '../../components/common/FormatDate';
import { Link } from 'react-router-dom';
import { getOrderList } from '../../components/api/adminInfo';
import useCart from '../../hooks/useCart';

const ShowCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(171, 190, 209, 0.4);
    border-radius: 8px;
    padding: 12px 25px;
    position: relative;
    height: 120px; 
`
const CardTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #717171;
`
const CardAmount = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    display: flex;
    align-items: center;
    color: #4D4D4D;
    position: absolute;
    bottom: 12px;
    right: 25px;
`

function Dashboard() {

    const { order_count, setOrderCount } = useCart();
    const [orderData, setOrderData] = useState([]);
    const [newOrder, setNewOrder] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [todaySale, setTodaySale] = useState(0);
    const WholeInfo = [
        {
            id: 1,
            title: 'New Order',
            amount: newOrder,
        },
        {
            id: 2,
            title: 'Total Sale',
            amount: totalSale,
        },
        {
            id: 3,
            title: 'Total Customer',
            amount: totalCustomer,
        },
        {
            id: 4,
            title: 'Today sale',
            amount: todaySale,
        },

    ];

    useEffect(() => {
        
        async function fetch() {
                const configuration = {
                    method: 'get',
                    url: `https://nova.shopwoo.com/api/v1/orders?store_id=2&per_page=5`,
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
                    }
                };
        
        
                axios(configuration).then(res => {
                    // setOrderData(res.data);
                    var pre_data = res.data;
                    for (var i in pre_data) {
                        let total_quantity = 0;
                        for (var y in pre_data[i].line_items)
                            total_quantity += pre_data[i].line_items[y].quantity
                        // pre_data[i].push({total_quantity: total_quantity})
                        pre_data[i] = { ...pre_data[i], total_quantity: total_quantity }
                    }
                    setOrderData(pre_data);
        
                });
                const today = new Date();
        
                const wholeInfo = {
                    method: 'get',
                    url: base_url + 'wholeinfo',
                    params: {
                        date: formatDate(today)
                    }
                }
                axios(wholeInfo)
                    .then((result) => {
                        setNewOrder(result.data.new_order);
                        setTotalCustomer(result.data.customers);
                        setTotalSale(result.data.total_sale);
                        setTodaySale(result.data.today_sale);
                    })
                    .catch((error) => {
                        alert(error);
                    });
                setOrderCount(await getOrderList());
                // console.log(await getOrderList());
            }
            fetch();
                

    }, [])

    return (
        <div className='d-grid gap-2'>
            <h2>Dashboard</h2>
            <div className='row'>
                {
                    WholeInfo.map((item) => (
                        <div className='col-3' key={item.id}>
                            <ShowCard>
                                <CardTitle>{item.title}</CardTitle>
                                <CardAmount style={{ color: item.id % 2 == 0 ? "#1AAB56" : "" }}>{item.id % 2 == 0 ? "$" : ''}{item.amount}</CardAmount>
                            </ShowCard>
                        </div>
                    ))
                }
            </div>
            <div className='row'>
                <div className='col-8'>
                    <SaleGraph />
                </div>
                <div className='col-4'>
                    <Traffic />
                </div>
            </div>
            <div>
                <ProfileTitle className='border-bottom bg-white'><label className='m-2'>Latest Orders</label><Link to='/admin/orders'><ExportButton className='m-2 py-1 px-2 bg-white'>View all</ExportButton></Link></ProfileTitle>
                <OrderTable OrderData={orderData} dashboard = {true}/>
            </div>
        </div>
    )
}
export default Dashboard;