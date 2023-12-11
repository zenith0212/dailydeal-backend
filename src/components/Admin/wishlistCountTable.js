import DataTable from 'react-data-table-component';

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
        name: 'Customers Number',
        selector: row => row.count,
        sortable: true
    },
    
];

function WishListCountTable(props) {

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


export default WishListCountTable;