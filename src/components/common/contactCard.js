import React from 'react';
import styled from 'styled-components';

const TouchCard = styled.div`
    border: 1px solid #D2DBE3;
    border-radius: 8px;
    background: #FFFFFF;
    padding: 24px;
    :hover{
        border: 1px solid #355E3B;
        box-shadow: 0px 4px 8px rgba(171, 190, 209, 0.4);
        background: #F2F7F2;
    }
`
const TouchTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    display: flex;
    align-items: center;
    color: #355E3B;
`
const TouchDescription = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    // align-items: center;
    color: #717171;
    margin: 18px 0 70px;
    height:50px;
`
const TouchButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #355E3B;
    border: 0.753102px solid #355E3B;
    border-radius: 4px;
    padding: 10px 16px;
    :hover{
        color: #FFFFFF;
        background: #355E3B;
    }
`
function ContactCard(props) {
    return (
        <>
            <TouchCard>
                <TouchTitle>{props.title}</TouchTitle>
                <TouchDescription>{props.description}</TouchDescription>
                <TouchButton>{props.buttonName}</TouchButton >
            </TouchCard>
        </>
    )
}
export default ContactCard;