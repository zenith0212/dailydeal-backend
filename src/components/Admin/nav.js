import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/logout';
import styled from 'styled-components';
import useCart from '../../hooks/useCart';
import { RiDashboardLine, RiFeedbackLine, RiUser3Line } from 'react-icons/ri';
import {SiDailymotion, SiBrandfolder} from 'react-icons/si';
import { BsCart3, BsChatLeftDots } from 'react-icons/bs';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';

export const OrderBadge = styled.div`
    background: #F90909;
    border-radius: 44px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    padding: 0 5px;
`
const NavItem = styled.li`
    display: flex;
    
    align-items: center;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    &.active{
        background: #F2F7F2;
        border-left: 2px solid #355E3B;
        color: #355E3B;
    }
    :hover{
        background: #F2F7F2;
        border-left: 2px solid #355E3B;
        color: #355E3B;
        text-decoration: none;
    }
    padding: 10px 3px;
    margin: 5px;
    color: #717171;
    gap:5px;
`
function AdminNav(){
    // const [orderBadge, setOrederBadge] = useState(32);
    const {order_count} = useCart();
    const location = useLocation();
    const path = location.pathname.replace('/admin/','');
    return(
        <div className='d-grid' style={{color:'#000'}}>
            <Link to="/admin/dashboard"><NavItem className={path==='dashboard'?'active':''}><RiDashboardLine size={20}/>Dashboard</NavItem></Link>
            <Link to="/admin/bransgateways"><NavItem className={path==='bransgateways'?'active':''}><SiBrandfolder size={20}/>BrandsGateway Products</NavItem></Link>
            <Link to='/admin/ourproduct'><NavItem className={path==='ourproduct'?'active':''}><SiDailymotion size={20}/>Dailydeal products</NavItem></Link>
            <Link to='/admin/orders'><NavItem className={path==='orders'?'active':''}><BsCart3 size={20}/><div className='d-flex justify-content-between w-100'><div>Orders</div><OrderBadge>{order_count}</OrderBadge></div></NavItem></Link>
            <Link to='/admin/customers'><NavItem className={path==='customers'?'active':''}><RiUser3Line size={20}/> Customers</NavItem></Link>
            <Link to='/admin/wishlist'><NavItem className={path==='wishlist'?'active':''}><MdOutlineFavoriteBorder size={20}/>Customer wishlist</NavItem></Link>
            <Link to='/admin/reviews'><NavItem className={path==='reviews'?'active':''}><RiFeedbackLine size={20}/>Reviews</NavItem></Link>
            <Link to='/admin/chat'><NavItem className={path==='chat'?'active':''}><BsChatLeftDots size={20}/>Chat</NavItem></Link>
            <Link to='/admin/settings'><NavItem className={path==='settings'?'active':''}><FiSettings size={20}/>Settings</NavItem></Link>
            <NavItem onClick={logout}><HiOutlineLogout size={20}/>Logout</NavItem>
        </div>
    )
}

export default AdminNav;