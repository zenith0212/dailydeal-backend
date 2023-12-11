import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import { CommonLabel, ProfileTitle } from '../Store/StyledCom';
function OrderDetail(props) {
    const shipping_detail = props.detail.shipping;
    const product_items = props.detail.line_items
    const columns = [
        {
            name: 'Product Name',
            selector: row => row.name
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Unit Price',
            selector: row => row.price,
        },
        {
            name: 'Total',
            selector: row => row.price * row.quantity,
        },

    ];
    return (
        <>
            <Modal show={props.showDetail} onHide={props.closeDetail} size='lg'>
                <Modal.Body>
                    {
                        props.detail.length === 0 ? <div>Nothing</div> :
                            <>
                                <div className='row'>
                                    <div className='col-4'>
                                        <ProfileTitle>Contact Information</ProfileTitle>
                                        <CommonLabel>{shipping_detail.first_name + " " + shipping_detail.last_name}</CommonLabel>
                                        <CommonLabel>{shipping_detail.email}</CommonLabel>
                                        <CommonLabel>{shipping_detail.phone}</CommonLabel>
                                    </div>
                                    <div className='col-4'>
                                        <ProfileTitle>Shipping Address</ProfileTitle>
                                        <CommonLabel>{shipping_detail.first_name + " " + shipping_detail.last_name}</CommonLabel>
                                        <CommonLabel>{shipping_detail.address_1 + " " + shipping_detail.city + " " + shipping_detail.state + shipping_detail.postcode}</CommonLabel>
                                        <CommonLabel>{shipping_detail.phone}</CommonLabel>
                                    </div>
                                    <div className='col-4'>
                                        <ProfileTitle>Payment Method</ProfileTitle>
                                        <CommonLabel>
                                            <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.214542" y="0.214542" width="39.5709" height="27.5709" rx="3.21812" fill="white" />
                                                <path d="M33.3332 13.9024C33.3332 18.6852 29.6479 22.5547 25.0928 22.5547C23.1701 22.5547 21.4076 21.8577 20.0113 20.7041C21.934 19.1178 23.1472 16.6663 23.1472 13.9024C23.1472 11.1384 21.9112 8.68691 20.0113 7.10065C21.4076 5.947 23.1701 5.25 25.0928 5.25C29.6479 5.25 33.3332 9.14356 33.3332 13.9024Z" fill="#F79E1B" />
                                                <path d="M20.0113 7.10065C20.0113 7.10065 20.0113 7.10065 20.0113 7.10065C21.9112 8.68691 23.1472 11.1384 23.1472 13.9024C23.1472 16.6663 21.934 19.1178 20.0113 20.7041L19.9883 20.7041C18.0885 19.1418 16.8525 16.6663 16.8525 13.9024C16.8525 11.1385 18.0885 8.68696 19.9884 7.1007C19.9884 7.10068 19.9884 7.10071 19.9884 7.1007L20.0113 7.10065Z" fill="#FF5F00" />
                                                <path d="M16.8525 13.9024C16.8525 11.1385 18.0885 8.68696 19.9884 7.1007C18.5921 5.94705 16.8296 5.25004 14.9068 5.25004C10.3518 5.25004 6.6665 9.11956 6.6665 13.9024C6.6665 18.6852 10.3518 22.5548 14.9068 22.5548C16.8296 22.5548 18.592 21.8577 19.9883 20.7041C18.0885 19.1418 16.8525 16.6663 16.8525 13.9024Z" fill="#EB001B" />
                                                <rect x="0.214542" y="0.214542" width="39.5709" height="27.5709" rx="3.21812" stroke="#CCCCCC" strokeWidth="0.429083" />
                                            </svg>
                                            Master Card
                                        </CommonLabel>
                                        <CommonLabel>**** **** **** 0773</CommonLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <DataTable
                                            columns={columns}
                                            data={product_items}
                                        />
                                    </div>
                                </div>
                            </>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
export default OrderDetail;