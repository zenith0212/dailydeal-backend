import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GoSettings } from 'react-icons/go';
import { Dropdown } from 'rsuite';
import CustomerTable from '../../components/Admin/customerTable';
import SearchBarView from '../../components/HomePage/SearchBarView';
import { ProfileTitle } from '../../components/Store/StyledCom';
import { base_url } from '../../config/config';
import { ReactComponent as Loading } from '../../asset/Gear.svg';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        method: 'get',
        url: base_url + 'userlist',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    useEffect(() => {
        axios(config)
            .then((result) => {
                setCustomers(result.data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <h2>Customers</h2>
            <ProfileTitle className='border-bottom bg-white'>
                <label className='m-2'>Traffic Source</label>
                <div className='p-2 d-flex'>
                    <div style={{ height: 40 }}>
                        <SearchBarView title="search email" />
                    </div>
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
            </ProfileTitle>
            {
                loading ? <Loading /> :
                    <CustomerTable CustomerData={customers} />
            }
        </div>
    );
};
export default Customers;