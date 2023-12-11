import { base_url } from "../../config/config";
import formatDate from "../common/FormatDate";

const API_ENDPOINT = base_url;
const today = new Date();
export const stripePaymentMethodHandler = async (data, cb) => {
    const { amount, result } = data;
    // console.log(formatDate())
    if (result.error) {
        // show error in payment form
        cb(result);
    } else {
        const paymentResponse = await stripePayment({
            payment_method_id: result.paymentMethod.id,
            name: result.paymentMethod.billing_details.name,
            email: result.paymentMethod.billing_details.email,
            amount: amount,
            order_id: data.id,
            line_items: data.line_items,
            shipping: data.shipping,
            date: formatDate(today)
        });
        console.log('result', paymentResponse);
        cb(paymentResponse);
    }
}

// place backend API call for payment
const stripePayment = async data => {
    // console.log("===========>", data);
    const res = await fetch(API_ENDPOINT + 'pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return await res.json();
}