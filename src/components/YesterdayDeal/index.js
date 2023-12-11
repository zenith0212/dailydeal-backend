import React, { useState, useEffect } from "react";
import Banner from "../HomePage/banner";
import Review from "../common/Review";
import formatDate from '../common/FormatDate';
import axios from "axios";
import YesterdayItem from "../ProductItem/yItem";
import SearchTime from "../common/SearchTime";
import { MissedDeal, ProductHeader, Search } from "../Store/StyledCom";
import MoreDeal from "../common/moreDeal";
import PreviousSwipe from "../PreviousDeal/PreviousSwipe";
import { base_url } from "../../config/config";


const wishlist = [
    {
        id: 0,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 1,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 2,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 3,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 4,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    },
    {
        id: 5,
        name: "(NEW) JBL Live Free NC+ ANC Earbuds w/Wireless Charging",
        pre_price: "$15",
        current_price: "$15",
        image_url: "/images/1.png"
    }

];


function YesterdayDeal() {

    const [yflag, setYflag] = useState(false);
    const [yesterdayDeals, setYesterdayDeals] = useState([]);
    var yTime = (flag) => {
        setYflag(flag);
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    useEffect(() => {
        const configY = {
            method: 'post',
            url: base_url + 'deals/yesterday',
            data: {
                post_date: formatDate(yesterday)
            }
        }

        axios(configY)
            .then((result) => {
                setYesterdayDeals(result.data);
            });

    }, [formatDate(yesterday)]);

    return (
        <>
            <Search>
                <SearchTime />
            </Search>
            <div className="container">
                <div className="row">
                    <ProductHeader>Missed yesterday’s deal?</ProductHeader>
                    <MissedDeal>
                        {
                            yesterdayDeals.length ===0? <h2 className="m-4">There aren't Yesterdays's deals</h2> :
                            yesterdayDeals.map((item) => (
                                <YesterdayItem key={item.product_id} {...item} flag={yflag} />
                            ))
                        }
                    </MissedDeal>
                </div>
            </div>

            <Banner />
            <MoreDeal />
            <div className="container">
                <PreviousSwipe />
            </div>
            <div className="container">
                <Review />
            </div>
        </>
    )
}

export default YesterdayDeal;