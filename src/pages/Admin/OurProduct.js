import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { base_url } from '../../config/config';
import { AdminCard, ProductPrice, ProductPriceInput, ProductTitle, ShowButton } from '../../components/Store/StyledCom';
import { DatePicker } from 'rsuite';
import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';
import { ReactComponent as Loading } from '../../asset/Gear.svg';
import useCart from '../../hooks/useCart';
import { Dropdown } from 'rsuite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SearchIcon from '@rsuite/icons/Search';

export const ConfirmBtn = styled.button`
    background: #355E3B;
    border-radius: 2px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #FFFFFF;
    height:40px;
    width: 45%;
`
export const DeleteBtn = styled.button`
    border: 0.753102px solid #717171;
    border-radius: 2px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #717171;
    height:40px;
    width: 45%;
`
const formatDate = (date) => {
    var d = new Date(date),
        month = date.slice(5, 7),
        day = date.slice(8, 10),
        year = date.slice(0, 4)

    return [year, month, day].join('-');
}

const OurItem = (props) => {
    const { dailydeal_list, setDailyDealList } = useCart();

    const notify = (message) => toast(message);
    const [postDate, setPostDate] = useState('2023-01-21');
    const [priceEditable, setPriceEditable] = useState(true);
    const [price, setPrice] = useState();
    const dateInputRef = useRef(null);

    const deleteOurProduct = (product_id) => {
        const configuration = {
            method: 'delete',
            url: base_url + 'ourproduct/' + product_id,
        };


        axios(configuration)
            .then((result) => {
                for (var i = 0; i < dailydeal_list.length; i++) {
                    if (dailydeal_list[i].product_id == result.data.product_id) {
                        dailydeal_list.splice(i, 1);
                        setDailyDealList(dailydeal_list);
                    }
                }
                notify(result.data.message);
            })
            .catch((error) => {
                error = new Error();
            });
    }

    const updateProduct = (product_id) => {
        const configuration = {
            method: 'put',
            url: base_url + 'ourproduct/' + product_id,
            data: {
                post_date: postDate,
                sale_price: price
            }
        };

        axios(configuration)
            .then((result) => {
                notify(result.data.message);

            })
            .catch((error) => {
                error = new Error();
            });
    }


    useEffect(() => {

        setPostDate(formatDate(props.post_date));
        setPrice(props.sale_price);
        // console.log(props.post_date)
    }, [props]);

    return (
        <div className='col-sm-3 d-grid my-2'>
            <AdminCard className='bg-white p-2'>
                <div className='d-flex justify-content-center' style={{ height: '16rem' }}>
                    <Link to={"/products/" + props.product_name} state={{ data: props.product_id }}>
                        <LazyLoadImage src={props.product_image} alt='product_image' className='h-100' style={{ maxWidth: '100%' }} />
                    </Link>
                </div>
                <ProductTitle style={{ height: 80 }}>{props.product_name}</ProductTitle>
                <div className='d-grid gap-2'>
                    <div className='d-flex justify-content-between'>
                        {
                            priceEditable ? <ProductPrice>${price}</ProductPrice> :
                                <ProductPriceInput type='number' placeholder={price} onChange={(e) => setPrice(e.target.value)} />
                        }

                        <div className='d-flex align-items-center'>
                            <FiEdit2 size={20} onClick={() => setPriceEditable(!priceEditable)} />
                        </div>
                    </div>
                    <DatePicker block size='md' placeholder={postDate} onChange={(e) => setPostDate(e.toISOString().slice(0, 10))} />
                    <div className='d-flex justify-content-between'>
                        <ConfirmBtn onClick={() => updateProduct(props.product_id)}>Confirm</ConfirmBtn>
                        <DeleteBtn onClick={() => deleteOurProduct(props.product_id)}>Delete</DeleteBtn>
                    </div>
                </div>
            </AdminCard>
        </div>
    )
}




var page = 1;
function OurProduct() {

    const { dailydeal_list, setDailyDealList } = useCart();
    const [loading, setLoading] = useState(true);
    const [sortTitle, setSortTitle] = useState('Date');
    const [searchTemp, SetSearchTemp] = useState("");
    const [searchKey, SetSearchKey] = useState("");
    const loadData = () => {
        console.log("serach", searchKey)
        const configP = {
            method: 'get',
            url: base_url + `ourproduct?pageSize=16&page=1&sort=${sortTitle}&search=${searchKey}`,
        }
        // console.log(configP)
        axios(configP)
            .then((result) => {
                setDailyDealList(result.data);
                console.log(result.data)
                setLoading(false);
                page = 1;
            })
    }
    const moreData = (page) => {
        setLoading(true);
        const configuration = {
            method: 'get',
            url: base_url + 'ourproduct',
            params: {
                pageSize: 16,
                page: page,
                sort: sortTitle,
                search: searchKey,
            }
        };
        axios(configuration).then((res) => {
            // console.log(res.data)
            setDailyDealList([...dailydeal_list, ...res.data]);
            setLoading(false);
        })
    }
    useEffect(() => {
        loadData();
    }, [sortTitle, searchKey]);

    const showMore = () => {
        page += 1;
        console.log(page);
        moreData(page)
    }

    // console.log(dailydeal_list);

    const handleSort = (e) => {
        console.log(e)
        setSortTitle(e)
    }

    const search = async () => {
        SetSearchKey(searchTemp);
    }

    return (
        <>
            <h2>DailyDeal products</h2>
            <div className='d-flex justify-content-between align-items-center'>
                <h5>{dailydeal_list.length} product(s) found.</h5>
                <div className='d-flex align-items-center gap-2'>
                    {/* <h5>sort by</h5> */}
                    <Dropdown title={sortTitle} style={{ border: "1px solid lightgray", borderRadius: "5px" }} onSelect={(e) => handleSort(e)}>
                        {/* <Dropdown.Item eventKey='Location'>Location</Dropdown.Item> */}
                        <Dropdown.Item eventKey='Date'>Date</Dropdown.Item>
                        <Dropdown.Item eventKey='Price'>Price</Dropdown.Item>
                        {/* <Dropdown.Item eventKey='Status'>Status</Dropdown.Item> */}
                        <Dropdown.Item eventKey='Name'>Name</Dropdown.Item>
                    </Dropdown>
                    <input value={searchTemp} style={{height: "40px"}} onChange={(e) => { SetSearchTemp(e.target.value) }} />
                    <button style={{ border: "1px solid lightgray", borderRadius: "5px", height: "40px"}} onClick={search}><SearchIcon />Search</button>
                </div>
            </div>
            <div className='row'>
                {
                    dailydeal_list.map((item, index) => {
                        // console.log(item.sale_price);
                        return <OurItem {...item} key={index} />
                    })
                }
                <ToastContainer autoClose={2000} />
            </div>
            <ShowButton className='d-flex m-auto' disabled={loading || dailydeal_list.length < 16} style={{ width: 'auto', height: 'auto', padding: 10 }} onClick={showMore}>
                {
                    loading ?
                        <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                        : "Show More"
                }
            </ShowButton>
        </>
    )
}
export default OurProduct;