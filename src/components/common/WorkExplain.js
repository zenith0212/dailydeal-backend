import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const WhatButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: ${(props) => (props.active ? "600" : "400")};
    font-size: 20px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    border-radius: 4px;
    border: none;
    border-bottom: ${(props) => (props.active ? 'none' : '1px solid #355E3B')};
    padding: 15px 25px;
    width: fit-content;
    background: ${(props) => (props.active ? "#F2F7F2" : "transparent")};
    color: #355E3B;
    @media screen and (max-width: 768px){
        font-size: 16px;
        line-height: 19px;
        font-weight: 500;
    }
`
const Content = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #212121;
    margin-top:56px;
    @media screen and (max-width: 768px){
        font-size: 16px;
        line-height: 24px;
        margin-top: 15px;
    }
`
const DiscriptionContents = styled.div`
    padding: 100px;
    @media screen and (max-width: 768px){
        padding: 24px 16px;
    }
`
function WorkExplain() {

    const [whatFlag, setWhatFlag] = useState(true);
    const [howFlag, setHowFlag] = useState(false);

    const whatAction = () => {
        setWhatFlag(true);
        setHowFlag(false);
    }
    const howAction = () => {
        setWhatFlag(false);
        setHowFlag(true);
    }

    return (
        <div className='container'>
            <div className='row' style={{ border: '1.5px solid #355E3B', borderRadius: 20 }}>
                <div className='col-md-5' style={{ padding: 0 }}>
                    <LazyLoadImage src='/images/back_how.png' alt='how' className='w-100 h-100' style={{ borderRadius: 20 }} />
                </div>
                <DiscriptionContents className='col-sm-7'>
                    <div className='d-flex gap-3'>
                        <WhatButton
                            onClick={whatAction}
                            active={whatFlag ? 1 : 0}
                        >What We do</WhatButton>
                        <WhatButton
                            onClick={howAction}
                            active={howFlag ? 1 : 0}
                        >How It works</WhatButton>
                    </div>
                    <Content>Lorem ipsum dolor sit amet consectetur. Eget vulputate potenti elit tristique cum. Vestibulum blandit nunc sed dui turpis laoreet id dignissim. Nunc amet lorem lobortis lorem pretium pulvinar vestibulum sed. Ut curabitur proin.Lorem ipsum dolor sit amet consectetur. Nibh nibh vitae quisque egestas faucibus volutpat te massa. Eget vulputate potenti elit tristique cum. Vestibulum blandit nunc sed dui turpis laoreet id dignissim. Nunc amet lorem lobortis lorem pretium pulvinar vestibulum sed. Ut curabitur proin.</Content>
                </DiscriptionContents>
            </div>
            {/* <Review items={items} active={0}/> */}
        </div>
    )
}

export default WorkExplain;