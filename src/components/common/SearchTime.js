import React, {useEffect} from 'react';
import styled from 'styled-components';
import SearchBarView from '../HomePage/SearchBarView';
import CountdownTimer from './countdown/CountdownTimer';

const SearchDiv = styled.div`
    height: 100%;
    @media only screen and (max-width: 768px){
        display: none;
    }
`
const TimeCounter = styled.div`
    background: #FCEB00;
    display: flex;
    align-items: center;
    padding: 4px 16px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    height:100%;
    justify-content:center;
    @media only screen and (max-width: 768px){
        width: 100%;
    }
`

function SearchTime(props) {
    useEffect(() => {
        console.group("SearchTime")
        console.groupEnd()
    },[])
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: 40 }}>
            <SearchDiv className='w-25'>
                <SearchBarView back={props.back} title="Search for a product"/>
            </SearchDiv>
            <TimeCounter>
                Deals Refresh in*:
                <CountdownTimer />
            </TimeCounter>
        </div>
    )
}
export default SearchTime;