import Cookies from "universal-cookie";

const cookies = new Cookies();
export const getCartInfo = () => {
    let list = cookies.get("cart_items");
    
    if (list === undefined){
        list = []
    }

    var count = list.length;

    var price = 0;
    for (var i in list) {

        price += list[i].product_price * list[i].product_quantity

    }
    return {
        price: price,
        count: count
    }
}