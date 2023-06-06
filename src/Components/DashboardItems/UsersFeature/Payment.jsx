import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authproviders";
import Swal from "sweetalert2";

const Payment = ({ price, cart }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [AXIOS] = AxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState();

    useEffect(() => {
        if(price > 0){
            AXIOS.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [price, AXIOS])

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

        setProcessing(true);

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
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentMethod.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                items: cart.map(item => item.name)
            }
            AXIOS.post('/payments', payment)
                .then(res => {
                    if (res.data.result.insertedId) {
                        Swal.fire({
                            title: 'Payment Successfull',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                })
        }
    }

    return (
        <>
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
                <button className="btn bg-orange-300 w-14 h-10 text-black hover:text-white border-none flex mt-10" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                transactionId && <p className="text-green-600">Transaction Complete With TransactionId: {transactionId}</p>
            }
        </>
    );
};

export default Payment;