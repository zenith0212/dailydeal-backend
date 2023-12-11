import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GoSettings } from 'react-icons/go';
import { Dropdown } from 'rsuite';
import ReviewTable from '../../components/Admin/reviewTable';
import SearchBarView from '../../components/HomePage/SearchBarView';
import { ProfileTitle } from '../../components/Store/StyledCom';
import { base_url } from '../../config/config';
import { ReactComponent as Loading } from '../../asset/Gear.svg';

function Reviews() {

    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        method: 'get',
        url: base_url + 'review'
    }
    useEffect(() => {
        axios(config)
            .then((result) => {
                setReviewData(result.data);
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <h2>Review</h2>
            <ProfileTitle className='border-bottom bg-white'>
                <label className='m-2'>Latest Review</label>
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
                    <ReviewTable reviewData={reviewData} />
            }
        </div>
    );
};
export default Reviews;