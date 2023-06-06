import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authproviders";

const Payment = ({ price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [AXIOS] = AxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState(' ')

    useEffect(() => {
        AXIOS.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: cofirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Anonymous User',
                        name: user?.displayName || 'Anonymous User',
                    },
                },
            },
        );
        if (cofirmError) {
            console.log(cofirmError);
        }
        console.log(paymentIntent);
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn bg-orange-300 w-14 h-10 text-black hover:text-white border-none flex mt-10" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default Payment;