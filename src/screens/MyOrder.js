import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const res = await fetch("http://localhost:5000/api/myOrderData", { // ✅ Fixed URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const response = await res.json();
            console.log("Fetched Order Data:", response);

            if (response.orderData) {
                setOrderData(response.orderData);
            } else {
                setOrderData([]); // ✅ Handle empty state
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrderData([]); // ✅ Handle error state
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {Array.isArray(orderData) && orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, orderIndex) => (
                            <div key={orderIndex} className='mb-4'>
                                {order.map((arrayData, index) => (
                                    <div key={`${orderIndex}-${index}`}>
                                        {arrayData.Order_date ? (
                                            <div className='m-auto mt-3 text-center'>
                                                <strong>{arrayData.Order_date}</strong>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3 mb-4'>
                                                <div className="card shadow" style={{ width: "16rem", maxHeight: "360px" }}>
                                                   
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container p-0'>
                                                            <span className='badge bg-secondary me-2'>{arrayData.qty}</span>
                                                            <span className='badge bg-secondary me-2'>{arrayData.size}</span>
                                                            <span className='badge bg-secondary'>{arrayData.Order_date}</span>
                                                            <div className='mt-2 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center my-5">
                            <h4>No Orders Found!</h4>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
