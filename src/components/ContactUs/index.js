import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ContactCard from '../common/contactCard';
import styled from 'styled-components';
import { HLinkContainer, LinkH, ProductHeader } from '../Store/StyledCom';

const faqList = [
    {
        id: 0,
        question: "When can I expect an answer to my message if I leave ourside working hours?",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    },
    {
        id: 1,
        question: "How we work",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    },
    {
        id: 2,
        question: "Payment Methods",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    },
    {
        id: 3,
        question: "Shipping & Free Returns",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    },
    {
        id: 4,
        question: "What are the shipping costs?",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    },
    {
        id: 5,
        question: "What is the delivery time?",
        answer: "Lorem ipsum dolor sit amet consectetur. Bibendum tincidunt eu fringilla quis lacus id nisi sed. Aliquet id varius donec accumsan at dignissim sit velit. Ut consectetur volutpat volutpat commodo risus nulla. At tellus rhoncus netus venenatis a nulla elit. Et fusce sit pulvinar natoque lorem donec nunc risus. Purus egestas felis."
    }
];

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

const FAQLink = styled.a`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #717171;
    text-decoration: none;
`
function ContactUs() {

    const [showChat, setShowChat] = useState(false)
    const openChat = () => {
        setShowChat(true);
    }
    return (
        <div>
            <div className='container' style={{paddingTop:70}}>
                <HLinkContainer>
                    <LinkH>Home</LinkH><MdKeyboardArrowRight /><LinkH>Deals</LinkH><MdKeyboardArrowRight /><LinkH><strong>Deal One</strong></LinkH>
                </HLinkContainer>
                <div className='row'>
                    <ProductHeader style={{border: 'none'}}>Get in touch</ProductHeader>
                    <div className='col-sm-3'>
                        <ContactCard {...contactUs} />
                    </div>
                    <div className='col-sm-3'>
                        <ContactCard {...chatNow} />
                        {/* <button onClick={openChat}>Open Chat</button> */}
                    </div>
                    <div className='col-sm-3'>
                        <ContactCard {...callUs} />
                    </div>
                    <div className='col-sm-3'>
                        <ContactCard {...writeFeedback} />
                    </div>
                </div>

                <div id='accordion' style={{margin:'120px 0'}}>
                    <ProductHeader style={{border:'none'}}>Frequently Asked Questions</ProductHeader>
                    {
                        faqList.map((item) => (
                            <div className="card border-0" key={item.id}>
                                <div className="card-header d-flex justify-content-between bg-transparent p-3">
                                    <FAQLink className="card-link" data-toggle="collapse" href={"#id" + item.id}>
                                        {item.question}
                                    </FAQLink>
                                    <FAQLink className="card-link" data-toggle="collapse" href={"#id" + item.id}><MdKeyboardArrowDown /></FAQLink>
                                </div>
                                <div id={"id" + item.id} className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* {showChat && <Client />} */}
            {/* <MoreDeal />? */}
        </div>
    )
}
export default ContactUs;