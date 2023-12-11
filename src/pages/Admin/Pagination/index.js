import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { base_url } from '../../../config/config';
import { AdminCard, ProductPrice, ProductTitle } from '../../../components/Store/StyledCom';
import styled from "styled-components";
import { DatePicker, SelectPicker } from 'rsuite';
import { Input, InputGroup, Whisper, Tooltip } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { BiDollar } from 'react-icons/bi';
import { ReactComponent as Loading } from '../../../asset/Gear.svg';
import {notification} from '../../../actions/notificantion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Button = styled.button`
    background: #355E3B;
    border-radius: 2px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    width: 100%;
    height: 40px;
    color: #FFFFFF;
`

const ProductItem = (props) => {

    const [salePrice, setSalePrice] = useState();
    const [postDate, setPostDate] = useState('2023-01-21');

    const { id } = props;
    // console.log(props);

    const notify = (message) => toast(message);

    var items = [];
    var variation_id = [];

    for (var i in props.variations) {
        var item = props.variations[i];
        if (item.stock_quantity !== 0) {
            items.push({
                label: item.attributes[0].option + "   " + item.stock_quantity + "    in stock",
                value: item.id,
                role: 'Master'
            });
            variation_id.push(item.id);
        }
    }

    const savePrice = () => {

        const configuration = {
            method: 'post',
            url: base_url + 'ourproduct',
            data: {
                id: props.id,
                variation_id: variation_id,
                name: props.name,
                image: props.images[0].src,
                sale_price: salePrice,
                regular_price: props.regular_price,
                post_date: postDate,
            }
        };

        axios(configuration)
            .then((result) => {

                notify(result.data.message);

            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    }


    return (
        <div className='col-sm-3 d-grid my-2'>
            <AdminCard className='bg-white p-2'>
                <div className='d-flex justify-content-center' style={{ height: '16rem' }}>
                    <Link to={"/products/" + props.name} state={{ data: id, type:"gateway" }}>
                        <LazyLoadImage src={props.images[0].src} alt='product_image' className='h-100' style={{ maxWidth: '100%' }} />
                    </Link>
                </div>
                <ProductTitle style={{ height: 80 }}>{props.name}</ProductTitle>

                <div className='d-grid gap-2'>
                    {/* <label>Our price</label> */}
                    <div className='d-flex justify-content-between'>
                        <ProductPrice>
                            {
                                props.type === 'variable' ? (
                                    props.variations.length === 0 ? 'empty variations' : "$" + props.variations[0].sale_price
                                )
                                    : "$" + props.sale_price
                            }
                        </ProductPrice>
                        {
                            props.type === 'simple' || props.variations.length === 0 ?
                                <div></div> :
                                <SelectPicker data={items} block searchable={false} placeholder={items[0].label} />

                        }

                    </div>

                    <div className='d-flex justify-content-between'>
                        <ProductPrice style={{ fontWeight: 400, fontSize: 14 }}>Sale price</ProductPrice>
                        <InputGroup inside style={{ width: '50%' }}>
                            <Input onChange={(e) => setSalePrice(e)} />
                            <BiDollar size={30} />
                        </InputGroup>
                        {/* <input type='number' name='salePrice' className='w-25' onChange={(e) => setSalePrice(e.target.value)} /> */}
                    </div>
                    <DatePicker block size='md' placeholder="Post Date" onChange={(e) => setPostDate(e.toISOString().slice(0, 10))} />
                    <Button onClick={savePrice}>Save</Button>
                    {/* <button>Edit</button> */}
                    {/* <button>Cancel</button> */}
                </div>
            </AdminCard>
        </div>
    )
}

function Items({currentItems}) {
    // console.log("==============>", currentItems)
    const [loading, setLoading] = useState(false);

    const update = async() =>{

        setLoading(true);
        try{
            const noti = await axios({url:base_url+'brandgateway', method:'post'})
            notification(noti.data.message);
        }
        catch(error){
            alert(error.response.data.message);
            notification("err");
        }
        setLoading(false);
    }
    return (
        <>
            <div className='row'>
                <div className='d-flex justify-content-between'>
                    <h2>BrandGrateway products</h2>
                    <div className='d-flex gap-2 align-items-center'>
                        <input  style={{height: "70%"}}/>
                        <button style={{height: "80%"}}><SearchIcon/>Search</button>
                        <button  style={{height: "80%"}} onClick={update}>Update</button>
                    </div>
                </div>
                {
                    loading?<Loading/>:
                    // console.log(currentItems)
                    currentItems.map((item) => (
                        // console.log("ITem", item)
                        <ProductItem {...item} key={item.id} />
                    ))
                }
                <ToastContainer autoClose={2000} />
            </div>
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
    
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState();
    const [page, setPage] = useState(1);
    const [sortById, setSortById] = useState();
    const [sortOrder, SetSortOrder] = useState();
    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(16);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    // const getProducts = (page) => {

    //     const configuration = {
    //         method: 'get',
    //         url: `https://nova.shopwoo.com/api/v1/products?store_id=2&page=${page}&per_page=16&stock_status=instock&lang=en`,
    //         headers: {
    //             'accept': 'application/json',
    //             'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
    //         }
    //     };

    //     axios(configuration).then(res => {
    //         setData(res.data);
    //         setLoading(false);
    //     });
    // }

    // const getProductList = async () => {
    //     var page = 1;
    //     while (page > 0) {
    //         const configuration = {
    //             method: 'get',
    //             url: `https://nova.shopwoo.com/api/v1/products?store_id=2&page=${page}&per_page=100&stock_status=instock&lang=en`,
    //             headers: {
    //                 'accept': 'application/json',
    //                 'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
    //             }
    //         };

    //         page++;
    //         await axios(configuration)
    //             .then(async (res) => {
    //                 var pre_data = res.data;

    //                 if (res.data.length === 0) {
    //                     page = 0;
    //                 } else {
    //                     all_products = all_products.concat(pre_data);
    //                     // console.log(result);
    //                     // i++;
    //                 }
    //                 console.log(all_products);



    //             })
    //             .catch((error) => {
    //                 page = 0;
    //             });
    //         }
    //         setLoading(false);
    //         setAllProducts(all_products);
    // }
    useEffect(() => {
        // getProductList();
        const getBrandProducts = async () =>{

            try {
                const productCount = await axios({url: base_url+'brandgateway/count', method:'get'});         
                const products = await axios({url: base_url+'brandgateway', method:'get', params:{page, limit, sortById, sortOrder}})
                
                setProductCount(productCount.data.count);
                setProducts(products.data);
                setLoading(false);
                console.log("zenith ======>", products.data)
            } catch(err){
                alert(err);
            }
        }
        getBrandProducts();
    }, [page])

    const pageCount = Math.ceil(productCount / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // alert(event.selected+1);
        setPage(event.selected + 1);
    };

    return (
        <>
            {
                loading ? <Loading />:
                    <div>
                        <Items currentItems={products} />
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
            }
        </>
    );
}

function BrandsGateway() {
    return (
        <PaginatedItems itemsPerPage={16} />
    )
}
export default BrandsGateway;