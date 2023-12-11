import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BsLink45Deg } from 'react-icons/bs';
import { ProfileTitle } from '../Store/StyledCom';
import { base_url } from '../../config/config';
import Cookies from 'universal-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const cookies = new Cookies()
const token = cookies.get('TOKEN');

const SocialCard = styled.div`
    background: #FFFFFF;
    border: 1.5px solid #89939E;
    border-radius: 4px;
    display:flex;
    justify-content: space-between;
    padding:10px;

`
const SocialLabel = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #355E3B;
    margin:0;

`
function Social() {

    const [social, setSocial] = useState();
    useEffect(() => {
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
        axios(config)
            .then((result) => {
                setSocial(result.data.social);
            })
    })
    return (
        <div className='col-sm-9'>
            <div className='my-3 h-75' style={{ background: '#fff' }}>
                <ProfileTitle className='border-bottom p-3'>My Social Accounts</ProfileTitle>
                <div className='row p-3'>
                    {
                        social === 'google' ?
                            <div className='col-12 col-md-6 my-3'>
                                <SocialCard>
                                    <div className='d-flex gap-3 w-75'>
                                        <LazyLoadImage src='/images/google.png' alt='Google' style={{ height: 25 }} />
                                        <SocialLabel>Sign up with Google</SocialLabel>
                                    </div>
                                    <BsLink45Deg size={25} />
                                </SocialCard>
                            </div>
                            : (
                                social === 'apple' ?
                                    <div className='col-12 col-md-6 my-3'>
                                        <SocialCard className='col-12 col-md-6 my-3'>
                                            <div className='d-flex gap-3 w-75'>
                                                <LazyLoadImage src='/images/apple.png' alt='Apple' style={{ height: 25 }} />
                                                <SocialLabel>Continue with Apple</SocialLabel>
                                            </div>
                                            <BsLink45Deg size={25} />
                                        </SocialCard>
                                    </div>
                                    :
                                    <div></div>
                            )
                    }
                </div>
            </div>
        </div>

    )
}

export default Social;