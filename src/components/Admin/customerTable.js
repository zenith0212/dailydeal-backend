import DataTable from 'react-data-table-component';
import { useState } from 'react';
import OrderDetail from './orderDetail';
import formatDate from '../common/FormatDate';
import {HiOutlineDotsVertical} from 'react-icons/hi';
const columns = [
    {
        name: 'User ID',
        selector: row => row._id
    },
    {
        name: 'Name',
        selector: row => row.first_name + row.last_name,
    },
    {
        name: 'Address',
        selector: row => row.address,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Contact Number',
        selector: row => row.phone_number,
    },
    {
        name: 'Payment Method',
        selector: row => row.payment_method,
        sortable: true
    },
    {
        name: 'Member',
        selector: row => formatDate(row.created_date),
        sortable: true
    },
    {
        cell: row => <HiOutlineDotsVertical />,
        allowOverflow: true,
        button: true,
        width: '56px',
    },
];

function CustomerTable(props) {

    return (
        <>
            <DataTable
                columns={columns}
                data={props.CustomerData}
                selectableRows
                pagination
            />
        </>
    );
};


export default CustomerTable;