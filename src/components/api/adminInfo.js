import axios from "axios";

export const getOrderList = async () => {
    var page = 1;
    var pre_data;
    var total_item = [];
    while (page < 100) {
        const configuration = {
            method: 'get',
            url: `https://nova.shopwoo.com/api/v1/orders?store_id=2&page=${page}&per_page=10`,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic c3RldmVAbmV3bWlyYS5jb20gOnN3NDg0NCEh',
            }
        };

        page++;
        await axios(configuration)
            .then(res => {
                pre_data = res.data;
                // console.log("=======>",res.data)
                total_item = total_item.concat(pre_data);
                if (res.data.length === 0) {
                    page = 100
                }

            })
            .catch((error) => {
                page = 0;
            });
    }
    return total_item.length;
}