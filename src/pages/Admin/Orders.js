import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBarView from '../../components/HomePage/SearchBarView';
import { Dropdown } from 'rsuite';
import { GoSettings } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import OrderTable from '../../components/Admin/orderTable';
import axios from 'axios';
import { base_url } from '../../config/config';
import formatDate from '../../components/common/FormatDate';
import { ReactComponent as Loading } from '../../asset/Gear.svg';

const TagItem = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    &.active{
        background: #F2F7F2;
        border-bottom: 2px solid #355E3B;
        color: #355E3B;
    }
    :hover{
        background: #F2F7F2;
        border-bottom: 2px solid #355E3B;
        color: #355E3B;
    }
    padding:14.5px;
    color: #717171;
    gap:5px;
`
const TagName = [
    {
        id: 1,
        name: "All Orders"
    },
    {
        id: 2,
        name: "Completed"
    },
    {
        id: 3,
        name: "Pending"
    },
    {
        id: 4,
        name: "Canceled"
    }
]

function Orders() {

    const [loading, setLoading] = useState(true);
    const [orderData, setOrderTotalData] = useState([]);
    const [filtedData, setFilteredData] = useState([]);

    var total_item = [];

    const getOrderList = async () => {
        var page = 1;
        while (page < 100) {
            const configuration = {
                method: 'get',
                url: `https://nova.shopwoo.com/api/v1/orders?store_id=2&page=${page}&per_page=10`,
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
                }
            };

            page++;
            await axios(configuration).then(async (res) => {
                var pre_data = res.data;

                if (res.data.length === 0) {
                    page = 100

                }
                var date;
                for (var i in pre_data) {
                    let total_quantity = 0;
                    for (var y in pre_data[i].line_items)
                        total_quantity += pre_data[i].line_items[y].quantity
                    // pre_data[i].push({total_quantity: total_quantity})
                    date = await getOrderDate(pre_data[i].id);
                    pre_data[i] = { ...pre_data[i], total_quantity: total_quantity, date: date }
                }


                // setFilteredData(pre_data);
                total_item = total_item.concat(pre_data);
                // console.log(total_item)

            })
                .catch((error) => {
                    page = 0;
                });
        }
        setOrderTotalData(total_item);
        // setOrderCount(total_item.length);
        setFilteredData(total_item);
        setLoading(false);
    }

    useEffect(() => {
        document.getElementById('1').classList.add('active');
        getOrderList();
    }, []);

    const getOrderDate = async (order_id) => {
        const config = {
            method: 'get',
            url: base_url + 'orders',
            params: {
                // email: localStorage.getItem('email')
                order_id: order_id
            }
        }
        var order_date;
        await axios(config)
            .then((result) => {
                order_date = formatDate(result.data[0].order_date);

            })
            .catch((error) => {
                order_date = 'Not available'
            })

        return order_date;
    }

    const OptionTag = (ee) => {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            element.classList.remove('active');
        });

        const checkPending = (orderData) => {
            return orderData.status === 'incomplete'
        }
        const checkComplete = (orderData) => {
            return orderData.status === 'completed'
        }
        const checkCanceled = (orderData) => {
            return orderData.status === 'cancelled'
        }
        switch (ee) {
            case 'Pending':
                setFilteredData(orderData.filter(checkPending));
                document.getElementById('3').classList.add('active');
                break;
            case 'Completed':
                setFilteredData(orderData.filter(checkComplete));
                document.getElementById('2').classList.add('active');
                break;
            case 'Canceled':
                setFilteredData(orderData.filter(checkCanceled));
                document.getElementById('4').classList.add('active');
                break;
            default:
                setFilteredData(orderData);
                document.getElementById('1').classList.add('active');
        }
    }

    return (
        <>
            <h2>Orders</h2>
            <div className='d-flex w-100 bg-white my-2'>
                {
                    TagName.map((item) => (
                        <TagItem id={item.id} onClick={() => OptionTag(item.name)}>{item.name}</TagItem>
                    ))
                }
            </div>
            <div className='bg-white p-2 d-flex'>
                <div className='w-75'>
                    <SearchBarView title="search email" />
                </div>
                <div className='w-25 d-flex justify-content-around'>
                    <Dropdown title="Filter by Location" icon={<GoSettings size={25} />}>
                        <Dropdown.Item>Location</Dropdown.Item>
                        <Dropdown.Item>Price</Dropdown.Item>
                        <Dropdown.Item>Status</Dropdown.Item>
                        <Dropdown.Item>Product</Dropdown.Item>
                    </Dropdown>
                    <div className='d-flex align-items-center'>
                        <FiSettings size={25} />
                    </div>
                </div>
            </div>
            {
                loading ? <Loading /> : <OrderTable OrderData={filtedData} />
            }
        </>
    );
}
export default Orders;