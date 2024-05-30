
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './product.css';
import axios from 'axios'
import Loader from '../Loader/Loader';
function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            });
    }, []);

    return (
        <>
            {isLoading ? (<Loader />) : (<section className='product-container'>
                {products.map((singleProduct) => (
                    <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
                ))}
            </section>)}


        </>
    )
}

export default Product;