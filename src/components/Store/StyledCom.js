import styled from "styled-components";
import { Link } from 'react-router-dom';

export const PriceShower = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 44px;
    display: flex;
    align-items: center;
    color: #355E3B;
`
export const PrePrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-decoration-line: line-through;
    color: #717171;
`
export const Quantity = styled.div`
    display: flex;
    border: 1.5px solid #ABBED1;
    border-radius: 4px;
    width: 100%;
    padding:5px;
    margin: 50px 0 20px 0;
    justify-content: space-between;
`
export const QButton = styled.button`
    background: transparent;
    border: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #4D4D4D;
    aspect-ratio: 1/1;
    :hover{
        background:#F2F7F2;
    }
`
export const QLabel = styled.label`
    // width: 200px;
    text-align:center;
    margin-bottom:0!important;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #4D4D4D;
`
export const CommonLabel = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #717171;
    margin: 20px 0;
`

export const CartButton = styled.button`
    background: #355E3B;
    border-radius: 4px;
    border:none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #FFFFFF;
    padding:14px 0;
    width:100%;
`
export const BuyButton = styled.button`
    color: #355E3B;
    border-radius: 4px;
    border: 1.5px solid #355E3B;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    background: #FFFFFF;
    padding:14px 0;
    width:100%;
`
export const LinkH = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #89939E;
    text-decoration:none;
`
export const HLinkContainer = styled.div`
    border-bottom: 1px solid #D2DBE3;
    padding: 10px;
    margin: 20px 0;
    @media screen and (max-width:768px){
        margin:0 0 20px 0;
    }
`
export const ProductHeader = styled.h1`
    padding: 36px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    border-bottom: 1px solid #D2DBE3;
    @media screen and (max-width: 768px){
        font-size: 24px;
        line-height: 29px;
        padding: 25px 0;
        display:block !important;
    }
`
export const Summary = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: -0.02em;
  color: #355E3B;
  padding: 13.5px 24px;
  border-bottom: 1px solid #D2DBE3;
`
export const SummaryTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #717171;
  padding: 13.5px 24px;
  border-bottom: 1px solid #D2DBE3;
  display: flex;
  justify-content: space-between;
`
export const SummaryValue = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #212121;
`
export const ShippingDate = styled.div`
  background: #F1E20F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #212121;
  height:66px;
  display:flex;
  align-items: center;
  justify-content: center;
`

export const SlideButton = styled.button`
    border:none;
    background:transparent;
    color: #12753B;
`

export const MainTitle = styled.div`
    text-align:center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: #355E3B;
    margin-top:76px;
    @media screen and (max-width:768px){
        font-size: 32px;
        line-height: 39px;
        padding-top:40px;
        margin-top:0;
    }
`
export const MainSubTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4D4D4D;
    padding: 20px;
    @media screen and (max-width:768px){
        font-size: 14px;
        line-height: 17px;
        text-align:center;
    }
`
export const HomeHeader = styled.div`
    background: #F5F7FA;
    height: 420px;
    padding-top: 70px;
    @media screen and (max-width: 768px){
        padding: 0;
        height: 270px;
    }
`
export const Title32 = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
`
export const ProfileTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #4D4D4D;
    justify-content: space-between;
`
export const HuntLabel16 = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #355E3B;
    cursor: pointer;
    margin:10px;
`
export const Label14 = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #717171;
`
export const SubscribeInput = styled.input`
    width: 50%;
    height:100%;
    // background: #89939E;
    border-radius: 4px;
    border: none;
    @media screen and (max-width: 768px){
        width: calc(80vw - 94px);
    }
`
export const SubscribeButton = styled.button`
    background: #355E3B;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    height:100%
    // width:94px;
`
export const ProfileLabel = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 140%;
    color: #717171;
`
export const Input = styled.input`
    border: none;
    border-bottom: 1px solid #D2DBE3;
    filter: drop-shadow(0px 2px 6px rgba(19, 18, 66, 0.07));
    border-radius: 4px;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #355E3B;
`
export const SaveButton = styled.button`
    background: #355E3B;
    border-radius: 4px;
    border: none;
    height: 60px;
    // font-family: 'Open Sans';
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #FFFFFF;
`
export const CancelButton = styled.button`
    // font-family: 'Open Sans';
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #355E3B;
    border: 1.5px solid #355E3B;
    border-radius: 4px;
    height: 60px;
`
export const Th = styled.th`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #717171;
`
export const Td = styled.td`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #4D4D4D;
`
export const Search = styled.div`
    padding-top: 70px;
    @media screen and (max-width: 768px){
        padding: 0;
    }
`
export const SocialButton = styled.button`
    background: #FFFFFF;
    border: 1.5px solid #89939E;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #355E3B;
    width: 100%;
    justify-content: center;
    padding: 12px 0;
    gap: 10px;
`
export const YTimeShower = styled.div`
    background:#FCEB00;
    border-radius:52px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #212121;
    padding: 14.5px 16px;
`
export const HeartIcon = styled.div`
    color: #355E3B;
`
export const CheckButton = styled.button`
    width: 180px;
    height: 60px;
    color: #355E3B;
    border-radius: 4px;
    border: 1.5px solid #355E3B;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    background: #FFFFFF;
    @media screen and (max-width: 768px){
        width: 100%;
    }
`

export const WishButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #355E3B;
    border: 1.5px solid #355E3B;
    border-radius: 4px;
    padding: 15px;
    background: transparent;
    @media screen and (max-width:768px){
        width: 100%;
    }
`
export const ProductTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #717171;
`
export const ProductPrice = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #717171;
`
export const ProductPriceInput = styled.input`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    line-height: 29px;
    color: #717171;
`
export const AdminCard =  styled.div`
    box-shadow: 0px 4px 8px rgba(171, 190, 209, 0.4);
    border-radius: 8px;
    background: #FFFFFF;
`
export const ExportButton = styled.button`
    background: #F2F7F2;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #355E3B;
`
export const MissedDeal = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 768px){
        display: block;
    }
`
export const ShowButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #355E3B;
    border: 1.5px solid #355E3B;
    border-radius: 4px;
    width: 241px;
    height: 60px;
    @media screen and (max-width:768px){
        width: 100%;
    }
`
export const Title48 = styled.div`
    font-size: 48px;
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #212121;
    @media screen and (max-width:768px){
        font-size:24px;
    }
`