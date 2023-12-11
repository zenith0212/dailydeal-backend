import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import { YTimeShower } from '../../Store/StyledCom';
import YesterdayTime from '../countdown/YesderdayTime';
import useCart from '../../../hooks/useCart';

function YesterdayMarker({yTime}) {

    const {setYDealAvailable} = useCart();
    const [yflag, setYflag] = useState(false);
    var yTime = (flag) => {
        setYflag(flag);
    }
    // setCount(1);

    useEffect(()=>{
        setYDealAvailable(yflag);
    })

    return (
        <YTimeShower>
            <AiOutlineEye size={20} />
            <YesterdayTime yTime={yTime} />
        </YTimeShower>
    )
}
export default YesterdayMarker;