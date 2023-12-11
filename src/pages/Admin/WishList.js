import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GoSettings } from 'react-icons/go';
import { Dropdown } from 'rsuite';
import styled from 'styled-components';
import SearchBarView from '../../components/HomePage/SearchBarView';
import { ProfileTitle } from '../../components/Store/StyledCom';
import { base_url } from '../../config/config';
import { ReactComponent as Loading } from '../../asset/Gear.svg';
import WishListTable from '../../components/Admin/wishlistTable';
import WishListCountTable from '../../components/Admin/wishlistCountTable';

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
        name: "All Wishlist"
    },
    {
        id: 2,
        name: "Customers per Product"
    },
]

function WishList() {

    const [wishlist, setWishList] = useState([]);
    const [wishlistCount, setWishListCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countOption, setCountOption] = useState(false);

    const config = {
        method: 'get',
        url: base_url + 'wishlist'
    }
    const config_count = {
        method: 'get',
        url: base_url + 'wishlist/count'
    }

    useEffect(() => {
        axios(config)
            .then((result) => {
                setWishList(result.data);
                setLoading(false);
            })

        document.getElementById('1').classList.add('active')
    }, [])

    const OptionTag = (ee) => {
        switch (ee) {
            case 'Customers per Product':
                document.getElementById('2').classList.add('active')
                document.getElementById('1').classList.remove('active')
                setCountOption(true);
                setLoading(true);
                axios(config_count)
                    .then((result) => {
                        setWishListCount(result.data);
                        setLoading(false);
                    })
                break;
            default:
                document.getElementById('1').classList.add('active')
                document.getElementById('2').classList.remove('active')
                setCountOption(false);
        }
    }

    return (
        <div>
            <h2>Wish List</h2>
            <div className='d-flex w-100 bg-white my-2'>
                {
                    TagName.map((item) => (
                        <TagItem key={item.id} id={item.id} onClick={() => OptionTag(item.name)}>{item.name}</TagItem>
                    ))
                }
            </div>
            <ProfileTitle className='border-bottom bg-white'>
                <label className='m-2'>Customers Wish List</label>
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
                loading ? <Loading /> : (countOption ? <WishListCountTable wishlistData={wishlistCount} /> : <WishListTable wishlistData={wishlist} />)
            }
        </div>
    );
};
export default WishList;