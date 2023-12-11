import React, {useState, useEffect} from 'react';
import Countdown from 'react-countdown';
import {base_url} from '../../../config/config';
import axios from 'axios';

function CountdownTimer() {

    const [leftTime, setLeftTime] = useState(86400);
    useEffect(() => {
        const configTime = {
            method: 'get',
            url: base_url + 'time'
        }
        axios(configTime).then((result) => {
            setLeftTime(result.data.leftTime)
            console.log(result.data.leftTime);
        });
    }, [])
    // var time = new Date(); var localTime = new Date(); var usHour =
    // parseInt(localTime.toLocaleString("en-US", {   timeZone:
    // "America/Los_Angeles", hour:'numeric', hour12:false }))-6; var usMin =
    // parseInt(localTime.toLocaleString("en-US", {   timeZone:
    // "America/Los_Angeles", minute:'numeric' })); var usSec =
    // parseInt(localTime.toLocaleString("en-US", {   timeZone:
    // "America/Los_Angeles", second:"numeric" })); // var utcDate = new
    // Date(time.toUTCString()); // var usHour = utcDate.getHours(); // var usMin =
    // utcDate.getMinutes(); // var usSec = utcDate.getSeconds();
    // console.log(usHour, usMin, usSec); if(usHour<8){   usHour = usHour + 24; }
    // var counted_seconds = 86400 - ((usHour-8)*3600 + usMin*60 + usSec);

    return (
        <div className='fw-bold'>
            <Countdown date={Date.now() + leftTime * 1000} autoStart={true}/>
            {/* <Countdown date={Date.now()}/> */}
        </div>
    )
}
export default CountdownTimer;
