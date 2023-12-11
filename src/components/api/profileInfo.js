import axios from "axios";
import { base_url } from "../../config/config";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('TOKEN');

const email = localStorage.getItem('email');

export const getAddressInfo = async () => {

    try {
        let result = await axios({ url: base_url + 'address', method: 'get', params: { email: email } });
        return { billAddress: result.data.billing, emptyBillText: "You have no other address entries in your address book", shipAddress: result.data.shipping, emptyShipText: "You have no other address entries in your address book" };
    } catch (err) {
        return { billAddress: null, emptyBillText: "", shipAddress: null, emptyShipText: "" };
    }
}
export const getUserInfo = async () => {
    const config = {
        method: 'post',
        url: base_url + 'profile/accountinfo',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            email: localStorage.getItem('email')
        }
    }
    try {
        let result = await axios(config);
        // console.log("result", result);
        return {
            firstName: result.data.first_name,
            lastName: result.data.last_name,
            phoneNumber: result.data.phone_number,
            birthday: result.data.birthday,
            email: result.data.email,
            verifyEmail: result.data.twostepverify,
            avatar: result.data.avatar
        }
    } catch {
        return {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthday: "",
            verifyEmail: "",
            avatar:""
        }
    }
}