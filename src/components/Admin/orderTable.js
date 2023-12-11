import DataTable from 'react-data-table-component';
import { useState } from 'react';
import OrderDetail from './orderDetail';

const columns = [
    {
        name: 'Order ID',
        selector: row => row.id
    },
    {
        name: 'Name',
        selector: row => row.shipping.first_name + row.shipping.last_name,
    },
    {
        name: 'Address',
        selector: row => row.shipping.address_1 + row.shipping.city + row.shipping.postcode,
    },
    {
        name: 'Price/QTY',
        selector: row => row.total + "/" + row.total_quantity,
    },
    {
        name: 'Status',
        selector: row => row.status,
    },
    {
        name: 'Date',
        selector: row => row.date,
        sortable: true
    },
];


function OrderTable(props) {

    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const closeDetail = () => setShowDetail(false);
    const detailOrder = (e) => {
        setShowDetail(true)
        setDetail(e)
    }

    return (
        <>
        {
            props.dashboard?
            <DataTable
                columns={columns}
                data={props.OrderData}
                selectableRows
                onRowClicked={(e) => detailOrder(e)}
            />
            :
            <DataTable
                columns={columns}
                data={props.OrderData}
                pagination
                selectableRows
                onRowClicked={(e) => detailOrder(e)}
            />

        }
            <OrderDetail showDetail={showDetail} closeDetail={closeDetail} detail={detail}/>
        </>
    );
};


export default OrderTable;