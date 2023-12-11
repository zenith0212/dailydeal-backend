import React, { useLayoutEffect, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import ProfilePage from './components/Profile';
import Footer from './components/layout/Footer';
import ProductDetails from './components/ProductDetails';
import YesterdayDeal from './components/YesterdayDeal';
import PreviousDeal from './components/PreviousDeal';
import HelpCenter from './components/HelpCenter';
import Cart from './components/Cart';
import Checkout from './components/Cart/Checkout';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Admin from './pages/Admin';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';
import ProtectedAdmin from './components/Auth/ProtectedAdmin';
import 'rsuite/dist/rsuite.min.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './CartContext';
import { useLocation } from 'react-router-dom';
// import ReactGA from 'react-ga';
import GA4React from "ga-4-react";
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const TRACKING_ID = "G-8728V4EJZE";
const ga4react = new GA4React(
  TRACKING_ID
);
const ga4 = await ga4react.initialize();
// const TRACKING_ID = "UA-179289509-2";
// const TRACKING_ID = "UA-179289509-3";
// ReactGA.initialize(TRACKING_ID);

const stripePromise = loadStripe("pk_test_51HjQPwHUGttVuI2vkJMFmXqQfGi6X9CmxZ7ZuoYCdPaVWTxlHt5YptCmN33b4eLOADnLH9N0vLNWFtTWKSEMrnvF00BRbgbxhm");

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    // console.log('URL changed');
    // console.log(`Current URL is ${location.pathname} ${location.search}`);
    console.log(`Current URL is ${location.pathname}`);
    // window.ga4react.set({ page: location.pathname });
    // window.ga4react.pageview(location.pathname);
    logEvent(analytics, 'screen_view', {
      unifiedScreenName: location.pathname,
    });
    ga4.pageview(location.pathname)

  }, [location]);
  return children
}

function App() {

  return (
    <>

      <BrowserRouter>
        <CartProvider>
          <Wrapper>
            <Header />
            <Routes>
              <Route element={<HomePage />} path="/" />
              {/* <Route element={<Signup />} path="/register" /> */}
              {/* <Route element={<Login />} path="/login" /> */}
              <Route element={<ProductDetails />} path="/products/*" />
              <Route element={<YesterdayDeal />} path="/yesterdaydeals" />
              <Route element={<PreviousDeal />} path="/previousdeals" />
              <Route element={<HelpCenter />} path="/helpcenter" />
              <Route exact path='/cart' element={<ProtectedRoutes />}>
                <Route element={<Cart />} path='/cart'></Route>
              </Route>
              {/* <Route element={<Cart />} path="/cart" /> */}
              <Route element=
                {
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                } path="/checkout" />

              <Route element={<AboutUs />} path="/aboutus" />
              <Route element={<ContactUs />} path="/contactus" />
              <Route exact path='/admin' element={<ProtectedAdmin />}>
                {
                  <Route element={<Admin />} path="/admin/*" />
                }
              </Route>
              <Route exact path='/profile' element={<ProtectedRoutes />}>
                <Route element={<ProfilePage />} path="/profile/*" />
              </Route>
              {/* <ProtectedRoutes element={<ProfilePage/>} path='/profile'/> */}
            </Routes>
            <Footer />
          </Wrapper>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
