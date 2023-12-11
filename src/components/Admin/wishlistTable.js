import DataTable from 'react-data-table-component';
import { useState } from 'react';
import OrderDetail from './orderDetail';
import formatDate from '../common/FormatDate';
import {HiOutlineDotsVertical} from 'react-icons/hi';
const columns = [
    {
        name: 'Product ID',
        selector: row => row.product_id
    },
    {
        name: 'Product Name',
        selector: row => row.product_name,
    },
    {
        name: 'Customers',
        selector: row => row.email,
    },
    
];

function WishListTable(props) {

    return (
        <>
            <DataTable
                columns={columns}
                data={props.wishlistData}
                selectableRows
                pagination
            />
        </>
    );
};


export default WishListTable;