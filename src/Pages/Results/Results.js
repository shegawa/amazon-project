import React from 'react'
import { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Product/ProductCard'
import './results.css'
import Loader from '../../Components/Loader/Loader';
function Results() {
    const [results, setResults] = useState([]);
    const { categoryName } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        axios.get(`${productUrl}/products/category/${categoryName}`)
            .then((res) => {
                setResults(res.data);
                setIsLoading(false)
            }).catch((err) => {
                console.error(err);
                setIsLoading(false)
            })
    }, []);
    return (

        <LayOut>
            <section>
                <h1 style={{ padding: '30px' }}>Result</h1>
                <p style={{ padding: '30px' }}>category/{categoryName}</p>
                <hr />
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='product-container'>
                        {results?.map((product) => (
                            <ProductCard
                                key={product.id}
                                renderAdd={true}
                                product={product}
                                renderDesc={false}

                            />
                        ))}
                    </div>
                )}
            </section>

        </LayOut>

    );
};
export default Results;