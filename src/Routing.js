import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment'
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Cart from './Pages/Cart/Cart';
import Orders from './Pages/Orders/Orders';
import Results from './Pages/Results/Results';
import Auth from './Pages/Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
const stripePromise = loadStripe('pk_test_51PLJc7RxTwkVbqpx62CAYEBu3eGdK3FI0TUFwJbvSsdjGvF3TVXXZ0RfOIZJdqBGb9j6fcPzIY6CZR7sYxcsEOLN0037CBHIpW');

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/payment" element={
                    <ProtectedRouter
                        msg={"you must log in to pay"}
                        redirect={"/payments"}>
                        <Elements stripe={stripePromise}>
                            <Payment /></Elements>

                    </ProtectedRouter>
                }
                />
                <Route path="/orders" element={
                    <ProtectedRouter
                        msg={"you must log in to access your orders"}
                        redirect={"/orders"}>
                    </ProtectedRouter>
                } />
                <Route path="/category/:categoryName" element={<Results />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default Routing;