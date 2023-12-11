import React from 'react';
import ContactCard from '../common/contactCard';
import styled from 'styled-components';
import WorkExplain from '../common/WorkExplain';
import { HomeHeader, MainSubTitle, MainTitle, ProductHeader, Title48 } from '../Store/StyledCom';
import Select from 'react-select';

const contactUs = {
    title: "Contact Us",
    description: "Log in for personalized service and assistance.",
    buttonName: "Log in"
}
const chatNow = {
    title: "Chat Now",
    description: "Chat live with one of our experts",
    buttonName: "Hello"
}
const callUs = {
    title: "Call us",
    description: "Our customer care experts are standing by.",
    buttonName: "Log in"
}
const writeFeedback = {
    title: "Feedback",
    description: "How was your experience? Give feedback about our website",
    buttonName: "Write Feedback"
}
const FollowFont = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
    margin-top:130px;
    @media screen and (max-width:768px){
        font-size:24px;
        text-align: left;
        border-bottom: 1px solid #D2DBE3;
    }
`
const Container = styled.div`
    padding-top: 70px;
    @media only screen and (max-width: 768px){
        padding:0;
    }
`
function AboutUs() {
    return (
        <Container>
            <HomeHeader>
                <div className='container'>
                    <MainTitle>
                        A new <label className='fw-normal'>(incredible!)</label> deal every day.
                    </MainTitle>
                    <MainSubTitle>Great deals on fashion, jewelry and other high-end product from all over the world,</MainSubTitle>
                </div>
            </HomeHeader>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-2'>
                        <div className='desktop_version mt-3'>
                            <div>about us</div>
                            <div>about us</div>
                            <div>about us</div>
                        </div>
                        <div className='mobile_version my-3'>
                            <Select
                                defaultValue={{ value: '3', label: 'About Us2' }}
                                options={[{ value: '1', label: 'About Us' }, { value: '2', label: 'About Us1' }, { value: '3', label: 'About Us2' }]}
                            />
                        </div>
                    </div>
                    <div className='col-sm-10 my-3'>
                        <Title48 className='my-2'>About us</Title48>
                        <p>Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis.
                            <br /><br />
                            Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis.
                        </p>
                    </div>
                </div>
            </div>

            <WorkExplain />

            <div className='container'>
                <div className='text-center'>
                    <FollowFont>Follow us</FollowFont>
                    <MainTitle style={{ margin: '25px 0 80px' }}>LinkedIn. Twitter. Instagram. Facebook</MainTitle>
                </div>
                <div className='row' style={{ marginBottom: 80 }}>
                    {/* <ProductHeader style={{border: 'none'}}>Get in touch</ProductHeader> */}
                    <div className='col-sm-3 my-2'>
                        <ContactCard {...contactUs} />
                    </div>
                    <div className='col-sm-3 my-2'>
                        <ContactCard {...chatNow} />
                    </div>
                    <div className='col-sm-3 my-2'>
                        <ContactCard {...callUs} />
                    </div>
                    <div className='col-sm-3 my-2'>
                        <ContactCard {...writeFeedback} />
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default AboutUs;