import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const CartContext = React.createContext([{}, () => {}]);

const CartProvider = (props) => {
    var cart_list = cookies.get('cart_items');
    var total_price = 0;
    var order_count = 0;
    var dailydeal_list = [];

    if (cart_list === undefined){
        cart_list = []
    }

    const [state, setState] = useState({
        price: total_price,
        count: cart_list.length,
        ydeal_available: true,
        order_count: order_count,
        dailydeal_list: dailydeal_list,
        admin_permission: false,
        reviewCount: 0
    })

    useEffect(() => {
        
        for(var i in cart_list){
            var item = cart_list[i];
            total_price += Number(item.product_price) * Number(item.product_quantity);
        }
        setState({ price: total_price, count: cart_list.length, ydeal_available: true, order_count: order_count, dailydeal_list: dailydeal_list, admin_permission: false, reviewCount: 0});
    }, [])

    return(
        <CartContext.Provider value = {[state, setState]}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider};