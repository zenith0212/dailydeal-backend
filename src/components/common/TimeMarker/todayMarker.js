import React from 'react';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';

const TodayMark = styled.div`
    padding: 10px 16px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #212121;
    background: #F1E20F;
    border-radius: 32px;
`
function TodayMarker(){
    return(
        <TodayMark><AiOutlineEye size={25} />Today Only</TodayMark>
    )
}
export default TodayMarker;