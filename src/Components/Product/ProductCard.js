
import './product.css';
import CurrencyFormat from './CurrencyFormat';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.Type';

function ProductCard({ product, flex, renderDesc, renderAdd }) {
    const { image, title, id, rating, price, description } = product;
    const [state, dispatch] = useContext(DataContext)
    console.log(state)
    console.log(dispatch)
    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: { id, image, title, rating, price, description },
        });
    };

    return (
        <div className={`card-container ${flex ? 'product-flex' : ''}`} >
            <Link to={`/products/${id}`}>
                <img src={image} alt='' />
            </Link>
            <div>
                <h3>{title}</h3>
                {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
                <div className='rating'>
                    <Rating value={rating?.rate} precision={0.1} />
                    <small>{rating?.count}</small>
                </div>
                <div>
                    <CurrencyFormat amount={price} />
                </div>
                {
                    renderAdd && <button className='button' onClick={addToCart}>
                        Add to cart
                    </button>
                }


            </div>
        </div>
    );
}

export default ProductCard;