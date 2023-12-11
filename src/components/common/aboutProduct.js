import React from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import styled from "styled-components";

const DetailTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
    padding: 40px 0;
    border-bottom: 1px solid #D2DBE3;
    margin-top: 50px;
`
const AboutTitle = styled.a`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
    color: #717171;
`
function AboutProduct(props) {

    return (
        <div className="mb-4">
            <DetailTitle>About This Product</DetailTitle>
            <div id="accordion">
                <div className="card border-0">
                    <div className="card-header d-flex justify-content-between bg-transparent">
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapseOne"
                        >
                            About this item
                        </AboutTitle>
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapseOne"
                        >
                            <MdKeyboardArrowDown />
                        </AboutTitle>
                    </div>
                    <div id="collapseOne" className="collapse" data-parent="#accordion">
                        <div className="card-body" dangerouslySetInnerHTML={{__html: props.about}}>
                         
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-header d-flex justify-content-between bg-transparent">
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse2"
                        >
                            Specifications
                        </AboutTitle>
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse2"
                        >
                            <MdKeyboardArrowDown />
                        </AboutTitle>
                    </div>
                    <div id="collapse2" className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-header d-flex justify-content-between bg-transparent">
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse3"
                        >
                            Payment Methods
                        </AboutTitle>
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse3"
                        >
                            <MdKeyboardArrowDown />
                        </AboutTitle>
                    </div>
                    <div id="collapse3" className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-header d-flex justify-content-between bg-transparent">
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse4"
                        >
                            Shipping & Free Returns
                        </AboutTitle>
                        <AboutTitle
                            className="card-link text-decoration-none"
                            data-toggle="collapse"
                            href="#collapse4"
                        >
                            <MdKeyboardArrowDown />
                        </AboutTitle>
                    </div>
                    <div id="collapse4" className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AboutProduct;