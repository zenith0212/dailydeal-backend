import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import useCart from '../../../hooks/useCart';

function YesterdayTime({ yTime }) {
    const {ydeal_available, setYDealAvailable} = useCart();

    const Completionist = () => <span>I’m sorry but this deal has ended.</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {

        yTime(!completed);
        // setYDealAvailable(false);

        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            
            // setYDealAvailable(true);
            return (
                <span>
                    Deals Remaining Hours*:
                    <strong>
                        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                    </strong>
                </span>
            );
        }
    };
    var time = new Date();
    var utcDate = new Date(time.toUTCString());
    var usHour = utcDate.getHours();
    var usMin = utcDate.getMinutes();
    var usSec = utcDate.getSeconds();


    if (usHour < 8) {
        usHour = usHour + 24;
    }
    var counted_seconds = 21600 - ((usHour - 8) * 3600 + usMin * 60 + usSec);

    return (
        <Countdown date={Date.now() + counted_seconds * 1000} renderer={renderer} />
    )
}
export default YesterdayTime;