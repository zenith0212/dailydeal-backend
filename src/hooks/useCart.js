import { useContext } from "react";
import { CartContext } from "../CartContext";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useCart = () => {
    const [state, setState] = useContext(CartContext);
    let cart_list = cookies.get("cart_items");
    if (cart_list === undefined){
        cart_list = []
    }
    function setPrice (item_price){
        setState(state => ({...state, price: state.price + item_price}));
    }
    function setCount(error){
        setState(state => ({...state, count: cart_list.length+error}))
    }
    function setYDealAvailable(flag){
        setState(state => ({...state, ydeal_available: flag}))
    }
    function setOrderCount(count){
        setState(state => ({...state, order_count: count}))
    }
    function setDailyDealList(list){
        setState(state => ({...state, dailydeal_list: list}))
    }

    function setAdminPermission(permission){
        setState(state=>({...state, admin_permission:permission}))
    }

    function setReviewCount(count){
        setState(state =>({...state, reviewCount: count}))
    }
    // setState(state => ({...state, count: cart_list.lenth}));
    
    return {
        setPrice,
        setCount,
        setYDealAvailable,
        setOrderCount,
        setDailyDealList,
        setAdminPermission,
        setReviewCount,
        price: state.price,
        count: state.count,
        ydeal_available: state.ydeal_available,
        order_count: state.order_count,
        dailydeal_list: state.dailydeal_list,
        admin_permission:state.admin_permission,
        reviewCount:state.reviewCount
    }
}

export default useCart;