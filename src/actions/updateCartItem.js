import Cookies from "universal-cookie";

const cookies = new Cookies();
export const updateCartItem = (id,quantity, error) => {
    const list = cookies.get("cart_items")
    // let index = list.findIndex(i => { return i.product_id === id });        
    for (var i in list) {
        if (list[i].product_id === id) {
            list[i].product_quantity = quantity + error
        }
    }
    cookies.set("cart_items", list, {
        path: '/',
        maxAge:3600,
    });
}