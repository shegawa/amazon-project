
import React, { useContext } from 'react';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/Product/CurrencyFormat';
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Type } from '../../Utility/action.Type';
import './cart.css';
function Cart() {
    const [{ basket, user }, dispatch] = useContext(DataContext);

    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

    const increment = (item) => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item,
        });
    };

    const decrement = (id) => {
        dispatch({
            type: Type.REMOVE_FROM_BASKET,
            id,
        });
    };

    return (
        <LayOut>
            <section className='container'>
                <div className='cart-container'>
                    <h2>Hello,{user?.name || 'Guest'}</h2>
                    <h3>Your Shopping Basket</h3>
                    <hr />
                    {basket?.length === 0 ? (
                        <p>Oops! No items in your cart.</p>
                    ) : (
                        basket?.map((item, i) => (
                            <section className='cart-product' key={i}>
                                <ProductCard
                                    product={item}
                                    renderDesc={true}
                                    renderAdd={false}
                                    flex={true}
                                />
                                <div className='btn-container'>
                                    <button className='btn' onClick={() => increment(item)}>
                                        <KeyboardArrowUpIcon size={15} />
                                    </button>
                                    <span>{item.amount}</span>
                                    <button className='btn' onClick={() => decrement(item.id)}>
                                        <KeyboardArrowDownIcon size={15} />
                                    </button>
                                </div>
                            </section>
                        ))
                    )}
                </div>
                {basket?.length !== 0 && (
                    <div className='subtotal'>
                        <div>
                            <p>Subtotal ({basket?.length} items)</p>
                            <CurrencyFormat amount={total} />
                        </div>
                        <span>
                            <input type="checkbox" />
                            <small>This order contains a gift</small>
                        </span>
                        <Link to="/payment">Continue to checkout</Link>
                    </div>
                )}
            </section>
        </LayOut>
    );
}

export default Cart;