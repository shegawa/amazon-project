import React from 'react'
import { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Product/ProductCard'
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
function ProductDetail() {
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);
    return (
        <LayOut>
            {isLoading ? (<Loader />) : (<ProductCard
                product={product}
                flex={true}
                renderDesc={true}
                renderAdd={true}
            />)}



        </LayOut>

    )
}
export default ProductDetail;