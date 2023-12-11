import DataTable from 'react-data-table-component';
import { Rate } from 'rsuite';
import formatDate from '../common/FormatDate';

const columns = [
    {
        name: 'Name',
        selector: row => row.name
    },
    {
        name: 'Product Name',
        selector: row => row.product_name,
    },
    {
        name: 'Rating',
        selector: row => <Rate size='sm' readOnly allowHalf defaultValue={row.mark}/> ,
    },
    {
        name: 'Date',
        selector: row => formatDate(row.createAt),
    }
];


function ReviewTable(props) {

    return (
        <>
            <DataTable
                columns={columns}
                data={props.reviewData}
                selectableRows
                pagination
            />
        </>
    );
};


export default ReviewTable;