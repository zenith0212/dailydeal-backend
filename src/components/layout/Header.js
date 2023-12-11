import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from 'rsuite';
import { MdOutlineFavoriteBorder, MdKeyboardArrowDown } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { BiMenu } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { CommonLabel } from '../Store/StyledCom';
import { ReactComponent as UserSVG } from '../../asset/user.svg';
import { ReactComponent as HelpSVG } from '../../asset/QuestionMarkCircleOutline.svg';
import { ReactComponent as LogoutSVG } from '../../asset/LogoutOutline.svg';
import Cookies from 'universal-cookie';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { base_url } from '../../config/config';
import axios from 'axios';
import { RiShoppingBag3Line } from 'react-icons/ri';
import useCart from '../../hooks/useCart';
import { AiOutlineClose } from 'react-icons/ai';
import { getUserInfo } from '../api/profileInfo';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const cookies = new Cookies();
const HeaderContainer = styled.div`
    padding: 10px 80px;
    position: fixed;
    z-index: 999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:#12753B;
    font-family: 'inter';
    height:70px;
    @media only screen and (max-width: 768px){
        padding: 58px 24px 24px;
        position: static;
    }
`
const Logo = styled(Link)`
    font-style: normal;
    font-weight: 700;
    font-size: 39.3211px;
    line-height: 48px;
    text-decoration: none;
    color: #fff!important;
    @media only screen and (max-width: 768px){
        font-size: 24px;
        line-height: 29px;
    }
`

const MenuLink = styled(Link)`
    padding: 10px 20px;
    align-self: center;
    text-decoration: none;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color:#fff!important;
    background: ${(props) => (props.active ? '#0E5C2F' : 'transparent')};
    border-radius: 50px;
    line-height: 29px;
    // display: ${(props) => (props.mobile ? 'none' : 'block')};
    display: ${(props) => (props.desktop ? 'block' : 'none')};
    @media only screen and (max-width: 768px){
        display: ${(props) => (props.mobile ? 'block' : 'none')};
        padding: 10px;
    }
`
const MenuIcon = styled.div`
    display: none;
    color: #ffffff;
    @media only screen and (max-width: 768px){
        display: block;
    }
`
const UserAvatar = styled.div`
    font-family: 'Inter';
    font-style: normal;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    gap: 10px;
    @media only screen and (max-width: 768px){
        display: none;
    }
`
const SignupButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #FFFFFF;
    background: #355E3B;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
`
const CreateAccount = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #355E3B;
    border: 1.5px solid #355E3B;
    border-radius: 4px;
    width: 100%;
    height: 40px;
`
const DropList = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #717171;
    gap: 10px;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 4px;
    :hover{
        background: #F2F7F2;
        color: #355E3B;
    }
`
const MobileNav = styled.div`
    display:none;
    @media only screen and (max-width:768px){
        display:block;
        position: absolute;
        left: 0;
        top: 82px;
        background-color: #fff;
        width: 0px;
        height: calc(100vh - 82px);
        transition: all 0.3s ease-in;
        overflow: hidden;
        z-index:9;
        &.active{
            padding:15px;
            width:300px;
        }
    }
`
const MobileMenuItem = styled.div`
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color:#212121;
    border-bottom: 1px solid #D2DBE3;
    padding: 15px 8px;
`
const ProfileImage = styled.img`
    clip-path: circle();
    aspect-ratio:1;
    height: 40px;
`
function Header() {
    const location = useLocation();

    const { price, count, admin_permission, setAdminPermission } = useCart();

    const [home, setHome] = useState(true);
    const [aboutUs, setAboutUs] = useState(false);
    const [yesterday, setYesterday] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [userName, setUserName] = useState("Account");
    // const [userData, setUserData] = useState({admin_permission:false});
    const [cartList, setCartList] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const [userInfo, setUserInfo] = useState({ avatar: "" });

    const token = cookies.get('TOKEN');
    // console.log('token', token)
    const handleHome = () => {
        setHome(true);
        setAboutUs(false);
        setYesterday(false);
        setPrevious(false);
        // console.log(location.pathname)
    }
    const handleAboutUs = () => {
        setHome(false);
        setAboutUs(true);
        setYesterday(false);
        setPrevious(false);
    }
    const handleYesterday = () => {
        setHome(false);
        setAboutUs(false);
        setYesterday(true);
        setPrevious(false);
    }
    const handlePrevious = () => {
        setHome(false);
        setAboutUs(false);
        setYesterday(false);
        setPrevious(true);
    }

    const signupClose = () => setShowSignup(false);
    const signupShow = () => setShowSignup(true);
    const closeLogin = () => setShowLogin(false);
    const closeRegister = () => setShowRegister(false);

    const loginModal = () => {
        setShowLogin(true);
        signupClose();
    }

    const registerModal = () => {
        setShowRegister(true);
        signupClose();
    }

    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        localStorage.removeItem("email");
        window.location.href = "/";
    }
    useEffect(() => {

        let cart_list = cookies.get("cart_items");
        setCartList(cart_list);

        const config = {
            method: 'post',
            url: base_url + 'profile/accountinfo',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                email: localStorage.getItem('email')
            }
        }
        if (token) {

            axios(config)
                .then((result) => {
                    // setUserName(result.data.first_name + " " + result.data.last_name);
                    // console.log(result.data.admin_permission);
                    setAdminPermission(result.data.admin_permission);
                    // if(result.data.admin_permission)
                })
                .catch(
                    setUserName("Account")
                )

            async function fetchData() {
                setUserInfo(await getUserInfo());
                // setAdminPermission(userInfo.admin_permission)
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        const path = location.pathname;
        if (path !== '/' && path !== '/aboutus' && path !== '/yesterdaydeals' && path !== '/previousdeals') {
            setHome(false);
            setAboutUs(false);
            setPrevious(false);
            setYesterday(false);
        }
    }, [location.pathname])

    const toggleNavItems = () => {
        setShowNav(!showNav);
    }
    const mobileSignIn = () => {
        setShowNav(false);
        setShowLogin(true);
    }
    const mobileSignUp = () => {
        setShowNav(false);
        setShowRegister(true)
    }
    return (
        <HeaderContainer>
            <div className='d-flex'>
                <MenuIcon><BiMenu size={25} onClick={toggleNavItems} /></MenuIcon>
                <Logo to='/'>DailyDeal</Logo>
            </div>
            <MobileNav className={`${showNav && 'active'}`}>
                <div className='text-end' onClick={() => setShowNav(false)}><AiOutlineClose /></div>
                {
                    token ?
                        <div className='d-flex gap-3 align-items-center'>
                            <LazyLoadImage src={userInfo.avatar ? userInfo.avatar : '/images/default_user.png'} alt='user_avatar' style={{ width: 70 }} />
                            <h4>{userName}</h4>
                        </div>
                        :
                        <>
                            <MobileMenuItem onClick={mobileSignIn}>Sign In</MobileMenuItem>
                            <MobileMenuItem onClick={mobileSignUp}>Create a new account?</MobileMenuItem>
                        </>

                }
                <MobileMenuItem className='mt-5' onClick={() => setShowNav(false)}><Link to='/'>Today's Deal</Link></MobileMenuItem>
                <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/yesterdaydeals'>Yesterday's Deal</Link></MobileMenuItem>
                <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/previousdeals'>Previous Deals</Link></MobileMenuItem>
                <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/aboutus'>About Us</Link></MobileMenuItem>
                <div className='mt-5'>
                    {
                        token ?
                            <>
                                {
                                    admin_permission ?
                                        <Link to='admin/dashboard' onClick={() => setShowNav(false)}><MobileMenuItem>Dashboard</MobileMenuItem></Link>
                                        :
                                        <></>
                                }

                                <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/profile/dashboard'>My Account</Link></MobileMenuItem>
                                <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/profile/help'>Help Center</Link></MobileMenuItem>
                                <MobileMenuItem onClick={logout}><Link to='/aboutus'>Log out</Link></MobileMenuItem>
                            </>
                            :
                            <MobileMenuItem onClick={() => setShowNav(false)}><Link to='/profile/help'>Help Center</Link></MobileMenuItem>
                    }
                </div>
            </MobileNav>
            <div className='d-flex'>
                <div className='mx-2 d-flex'>
                    <MenuLink to='/' desktop="true" active={home ? 1 : 0} onClick={handleHome}>Home</MenuLink>
                    <MenuLink to='/aboutus' desktop="true" active={aboutUs ? 1 : 0} onClick={handleAboutUs}>About Us</MenuLink>
                    <MenuLink to='/yesterdaydeals' desktop="true" active={yesterday ? 1 : 0} onClick={handleYesterday}>Yesterday's Deals</MenuLink>
                    <MenuLink to='/previousdeals' desktop="true" active={previous ? 1 : 0} onClick={handlePrevious}>Previous Deals</MenuLink>
                </div>

                <div className='d-flex header gap-2'>
                    <MenuLink to='/profile/wishlist' desktop="true"><MdOutlineFavoriteBorder size={25} /></MenuLink>
                    <MenuLink to='/search' mobile="true" ><FiSearch /></MenuLink>
                    <MenuLink to='/cart' desktop="true" mobile="true" className={count === 0 ? 'text-white d-flex align-items-center' : 'text-white d-flex align-items-end'}>
                        {
                            count === 0 ? 
                                <RiShoppingBag3Line size={25} />
                                :
                                <Badge content={count} color='yellow'>
                                    <div className='d-grid'>
                                        <RiShoppingBag3Line size={25} />
                                        <span style={{ fontSize: 10, padding: 0 }}>${price}</span>
                                    </div>
                                </Badge>
                        }
                    </MenuLink>

                    <UserAvatar desktop="true" onClick={signupShow}>
                        <ProfileImage src={userInfo.avatar ? userInfo.avatar : '/images/default_user.png'} alt='user_avatar' />
                        {userInfo.firstName ? userInfo.firstName + " " + userInfo.lastName : "Account"}
                        <MdKeyboardArrowDown  size={25} />
                    </UserAvatar>

                    <Modal className='header' backdropClassName="newBackdrop" show={showSignup} onHide={signupClose}>
                        <Modal.Body>
                            {
                                !token ?
                                    <div>
                                        <SignupButton onClick={() => loginModal()}>Sign In</SignupButton>
                                        <CreateAccount onClick={() => registerModal()}>Create Account</CreateAccount>
                                        {/* <CommonLabel className='justify-content-center cursor-pointer'>Forgot Password?</CommonLabel> */}
                                    </div>
                                    :
                                    <div>
                                        {
                                            admin_permission ?
                                                <Link to='admin/dashboard' style={{ textDecoration: 'none' }} onClick={() => setShowSignup(false)}><DropList><RxDashboard />Dashboard</DropList></Link>
                                                : <></>
                                        }
                                        <Link to='profile/dashboard' style={{ textDecoration: 'none' }} onClick={() => setShowSignup(false)}><DropList><UserSVG />My Account</DropList></Link>
                                        <Link to='profile/help' style={{ textDecoration: 'none' }} onClick={() => setShowSignup(false)}><DropList><HelpSVG />Help</DropList></Link>
                                        <DropList onClick={logout}><LogoutSVG />Logout</DropList>
                                    </div>
                            }
                        </Modal.Body>
                    </Modal>
                    <Login showLogin={showLogin} closeLogin={closeLogin} />
                    <Register showRegister={showRegister} closeRegister={closeRegister} />
                </div>
            </div>
        </HeaderContainer>
    )

}
export default Header;