import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HLinkContainer, LinkH, Title32, ProfileTitle, HuntLabel16, SubscribeInput, SubscribeButton } from '../Store/StyledCom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import PersonalInformation from './PersonalInformation';
import RecentOrders from './RecentOrders';
import WishList from './WishList';
// import User from '/images/user.svg';
import { ReactComponent as DashboardSVG } from '../../asset/dashboard.svg';
import { ReactComponent as UserSVG } from '../../asset/user.svg';
import { ReactComponent as AddressSVG } from '../../asset/address.svg';
import { ReactComponent as OrderSVG } from '../../asset/order.svg';
import { ReactComponent as HeartSVG } from '../../asset/heart.svg';
import { ReactComponent as CreditSVG } from '../../asset/credit.svg';
import { ReactComponent as SocialSVG } from '../../asset/social.svg';
import { ReactComponent as HelpSVG } from '../../asset/QuestionMarkCircleOutline.svg';
import { ReactComponent as PrivacySVG } from '../../asset/BookOpenOutline.svg';
import { ReactComponent as TermsSVG } from '../../asset/ClipboardListOutline.svg';
import { ReactComponent as LogoutSVG } from '../../asset/LogoutOutline.svg';
import PaymentCard from './PaymentMethod/PaymentCard';
import Social from './Social';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import AddressShow from './AddressBook';
import AddNewAddress from './AddressBook/AddNewAddress';
import EditAddress from './AddressBook/EditAddress';
import StripeAdd from './PaymentMethod/StripeAdd';

const ProfileContainer = styled.div`
    background: #F5F7FA;
    padding: 70px 0;
    @media only screen and (max-width:768px){
        padding:0;
    }
`

const Label16 = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
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
    }
    padding:14.5px;
    margin: 5px;
    color: #717171;
    gap:5px;
    @media only screen and (max-width:768px){
        padding:0;
    }
`

const cookies = new Cookies();

const option = [
    {
        value: 'dashboard',
        label:
            <Label16>
                <DashboardSVG />
                Dashboard
            </Label16>
    },
    {
        value: 'info',
        label:
            <Label16>
                <UserSVG />
                Account Information
            </Label16>
    },
    {
        value: 'address',
        label:
            <Label16>
                <AddressSVG />
                Address Book
            </Label16>
    },
    {
        value: 'order',
        label:
            <Label16>
                <OrderSVG />
                My Orders
            </Label16>
    },
    {
        value: 'wishlist',
        label:
            <Label16>
                <HeartSVG />
                My Wish List
            </Label16>
    },
    {
        value: 'savedcards',
        label:
            <Label16>
                <CreditSVG />
                My Saved Cards
            </Label16>
    },
    {
        value: 'socialaccount',
        label:
            <Label16>
                <SocialSVG />
                My Social Accounts
            </Label16>

    }
]
function Profile() {

    const location = useLocation();
    const [tab, setTab] = useState('dashboard');

    const navigate = useNavigate();

    const switchTab = (name) => {
        setTab(name)
        navigate(`${name}`, {state:{position:'first'}});
    }
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        localStorage.removeItem("email");
        window.location.href = "/";

    }

    useEffect(() => {
        const path = location.pathname;

        switch (path) {
            case '/profile/wishlist': setTab('wishlist');
                break;
            case '/profile/info': setTab('info');
                break;
            case '/profile/address': setTab('address');
                break;
            case '/profile/address/edit': setTab('address');
                break;
            case '/profile/address/add': setTab('address');
                break;
            case '/profile/order': setTab('order');
                break;
            case '/profile/savedcards': setTab('savedcards');
                break;
            case '/profile/socialaccount': setTab('socialaccount');
                break;
            case '/profile/help': setTab('help');
                break;
            case '/profile/privacy': setTab('privacy');
                break;
            case '/profile/terms': setTab('terms');
                break;
            default: setTab('dashboard');
        }
    }, [location.pathname])

    return (
        <>
            <ProfileContainer>
                <div className='container'>
                    <HLinkContainer>
                        <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
                    </HLinkContainer>
                    <Title32 className='border-bottom mb-3 py-3'>My Account</Title32>
                    <div className='row'>
                        <div className='col-sm-3 desktop_version'>
                            <div className='bg-white my-3'>
                                <ProfileTitle className='border-bottom p-3'>Account Dashboard</ProfileTitle>
                                <div className='p-2'>
                                    <Label16 className={tab === 'dashboard' ? 'active' : ''} onClick={() => switchTab('dashboard')}>
                                        <DashboardSVG className={tab === 'dashboard' ? 'active' : ''} />
                                        Dashboard
                                    </Label16>
                                    <Label16 className={tab === 'info' ? 'active' : ''} onClick={() => switchTab('info')}>
                                        <UserSVG className={tab === 'info' ? 'active' : ''} />
                                        Account Information
                                    </Label16>
                                    <Label16 className={tab === 'address' ? 'active' : ''} onClick={() => switchTab('address')}>
                                        <AddressSVG className={tab === 'address' ? 'active' : ''} />
                                        Address Book
                                    </Label16>
                                    <Label16 className={tab === 'order' ? 'active' : ''} onClick={() => switchTab('order')}>
                                        <OrderSVG className={tab === 'order' ? 'active' : ''} />
                                        My Orders
                                    </Label16>
                                    <Label16 className={tab === 'wishlist' ? 'active' : ''} onClick={() => switchTab('wishlist')}>
                                        <HeartSVG className={tab === 'wishlist' ? 'active' : ''} />
                                        My Wish List
                                    </Label16>
                                    <Label16 className={tab === 'savedcards' ? 'active' : ''} onClick={() => switchTab('savedcards')}>
                                        <CreditSVG className={tab === 'savedcards' ? 'active' : ''} />
                                        My Saved Cards
                                    </Label16>
                                    <Label16 className={tab === 'socialaccount' ? 'active' : ''} onClick={() => switchTab('socialaccount')}>
                                        <SocialSVG className={tab === 'socialaccount' ? 'active' : ''} />
                                        My Social Accounts
                                    </Label16>
                                </div>
                            </div>


                            <div className='bg-white my-3'>
                                <ProfileTitle className='border-bottom p-3'>Customer Service</ProfileTitle>
                                {/* <Label16>Help</Label16> */}
                                <Label16 className={tab === 'help' ? 'active' : ''} onClick={() => switchTab('help')}>
                                    <HelpSVG className={tab === 'help' ? 'active' : ''} />
                                    Help
                                </Label16>
                                <Label16 className={tab === 'privacy' ? 'active' : ''} onClick={() => switchTab('privacy')}>
                                    <PrivacySVG className={tab === 'privacy' ? 'active' : ''} />
                                    Communications & privacy
                                </Label16>
                                <Label16 className={tab === 'terms' ? 'active' : ''} onClick={() => switchTab('terms')}>
                                    <TermsSVG className={tab === 'terms' ? 'active' : ''} />
                                    Terms of Use
                                </Label16>
                                <Label16 onClick={() => logout()}>
                                    <LogoutSVG />Logout</Label16>
                            </div>
                        </div>
                        <div className='mobile_version'>
                            <Select
                                defaultValue={option[0]}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '',
                                        primary: 'transparent'
                                    },
                                })}
                                options={option}
                                onChange={(e)=>switchTab(e.value)}
                            />
                        </div>

                        <Routes>
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<PersonalInformation />} path="/info" />
                            <Route element={<AddressShow />} path="/address" />
                            <Route element={<EditAddress />} path="/address/edit" />
                            <Route element={<AddNewAddress />} path="/address/add" />
                            <Route element={<RecentOrders />} path="/order" />
                            <Route element={<WishList />} path="/wishlist" />
                            <Route element={<PaymentCard />} path="/savedcards" />
                            <Route element={<StripeAdd />} path="/savedcards/stripe/add" />
                            <Route element={<Social />} path="/socialaccount" />
                        </Routes>
                    </div>
                </div>
            </ProfileContainer>
        </>
    )
}
export default Profile;