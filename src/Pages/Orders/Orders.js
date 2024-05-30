import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import './orders.css'
import { db } from '../../Utility/Firebase'
import ProductCard from '../../Components/Product/ProductCard'
import { Padding } from '@mui/icons-material';

function Orders() {
    const [{ user }, dispatch] = useContext(DataContext);
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (user) {
            db.collection("users").doc(user.uid).collection('orders').orderBy("created", "desc").onSnapshot((snapshot) => {
                setOrders(snapshot.docs.map((doc) => ({
                    id: doc.id, data: doc.data()
                }))
                )
            })
        } else {
            setOrders([])
        }
    }, []);

    return (
        <LayOut>
            <section className='container'>
                <div className='order-container'>
                    <h2> Your  Orders </h2>
                    {
                        orders?.length == 0 && <div style={{ Padding: "20px" }} > you do not have orders yet </div>
                    }
                    <div>{
                        orders?.map((eachOrder, i) => {
                            return (
                                <div key={i}>
                                    <hr />
                                    <p> Order Id: {eachOrder?.id}</p>
                                    {
                                        eachOrder?.data?.basket?.map((order) => (
                                            <ProductCard
                                                flex={true}
                                                product={order}
                                                key={order.id} />
                                        ))}
                                </div>

                            )
                        })} </div>
                </div>
            </section >
        </LayOut >

    )
}
export default Orders;