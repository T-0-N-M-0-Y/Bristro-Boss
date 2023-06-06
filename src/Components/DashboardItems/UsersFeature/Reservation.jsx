import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import useCart from "../../../Hooks/useCart";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Reservation = () => {

    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div className="mt-40 mx-40">
            <Elements stripe={stripePromise}> 
                <Payment cart={cart} price={price}></Payment>
            </Elements>
        </div>
    );
};

export default Reservation;