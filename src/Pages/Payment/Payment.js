import React, { useContext, useState } from 'react'
import './payment.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/Product/CurrencyFormat';
import axiosInstance from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/Firebase'
import { Navigate, useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.Type';

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const totalItem = basket?.reduce((amount, item) => { return item.amount + amount }, 0);

    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

    const [cardError, setCardError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const handleChange = (e) => {
        e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            setProcessing(true);
            const response = await axiosInstance({
                method: "post",
                url: `/payment/create?total=${total * 100}`,
            });
            const clientSecret = response.data?.clientSecret;
            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });
            await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
            dispatch({ type: Type.EMPTY_BASKET });
            setProcessing(false);
            navigate("/orders", { state: { msg: "you have placed new order" } })
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }
    }
    return (

        <LayOut>
            <div className='payment-header'>
                checkout({totalItem}) items
            </div>
            <section className='payment'>
                <div className='flex'>
                    <h3>Delivery Address</h3>
                    <div>
                        <div>{user?.email}</div>
                        <div>123 React Lane</div>
                        <div>Mizan</div>
                    </div>
                </div>
                {/* product */}
                <div className='flex'>
                    <h3>Review items and delivery</h3>
                    <div>
                        {basket?.map((item) => <ProductCard product={item} flex={true} />)}
                    </div>
                </div>
                <hr />
                {/* card from */}
                <div className='flex'>
                    <h3>Payment method</h3>
                    <div className='payment-card'>
                        <div className='payment-detail'>
                            <form onSubmit={handlePayment}>
                                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                                <CardElement onChange={handleChange} />
                                <div className='payment-price'>
                                    <div>
                                        <span style={{ display: "flex" }}>
                                            <p>Total Order | </p>
                                            <CurrencyFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type="submit">
                                        {
                                            processing ? (
                                                <div className='loader'>
                                                    <ClipLoader color='gray' size={12} />
                                                    <p> Please Wait ...</p>
                                                </div>
                                            ) : "Pay Now"
                                        }

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </LayOut>

    )
}
export default Payment