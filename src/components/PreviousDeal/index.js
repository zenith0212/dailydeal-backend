import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Banner from "../HomePage/banner";
import WishListItem from "../WishlistItem";
import styled from "styled-components";
import AboutProduct from "../common/aboutProduct";
import Review from "../common/Review";
import { MdKeyboardArrowRight } from "react-icons/md";
import SearchTime from '../common/SearchTime';
import { CommonLabel, HLinkContainer, LinkH, ProductHeader, Search, ShowButton } from '../Store/StyledCom';
import { base_url } from '../../config/config';
import axios from 'axios';
import MoreDeal from '../common/moreDeal';

function PreviousDeal() {

    const [previousDeals, setPreviousDeals] = useState([]);
    const [previousCount, setPreviousCount] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const loadData = () => {
        const configP = {
            method: 'get',
            url: base_url + `deals/previous/all?pageSize=12&page=1`,
        }
        // console.log(configP)
        axios(configP)
            .then((result) => {
                setPreviousDeals(result.data)
            })
    }

    function moreData() {
        // alert("aaa");
        setLoading(true);
        const configuration = {
            method: 'get',
            url: base_url + `deals/previous/all?pageSize=12&page=${page}`,
        };
        axios(configuration).then(res => {
            setPreviousDeals([...previousDeals, ...res.data]);
            setLoading(false);
        });
    }
    useEffect(() => {
        axios.get(base_url + 'deals/previous/count').then(res => {
            // console.log(res.data)
            setPreviousCount(res.data);
        });
        loadData()
    }, []);

    useEffect(() => {
        moreData()
    }, [page]);
    return (
        <>
            <Search>
                <SearchTime />
            </Search>
            <div className="container">
                <HLinkContainer>
                    <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
                </HLinkContainer>

                <div>
                    <ProductHeader className='d-flex justify-content-between'>
                        <label>Previous Daily Deals</label>
                        <CommonLabel>{previousCount} Deals</CommonLabel>
                    </ProductHeader>
                    <div className="row">
                        {
                            previousDeals.map((item) => (
                                <div key={item.product_id} className="col-sm-3">
                                    <WishListItem {...item} />
                                </div>
                            ))
                        }
                    </div>
                    <div className='row p-3'>
                        <ShowButton className='m-auto' onClick={() => setPage(page + 1)} disabled={loading}>
                            {
                                loading ?
                                    <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                                    :"Show More"
                            }
                        </ShowButton>
                    </div>
                </div>
            </div>
            <Banner />
            <MoreDeal />
            <div className="container">
                <AboutProduct />
                <Review />
            </div>
        </>
    )
}
export default PreviousDeal;