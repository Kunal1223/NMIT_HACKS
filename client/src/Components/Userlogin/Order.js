import React, { useState,useContext ,useEffect } from 'react';
import orderContext from "../context/Order/orderContext";
import { useLocation ,useNavigate} from 'react-router-dom';
import OrderCard from './OrderCard';

export default function Order() {
    const location = useLocation();
    const navigate=useNavigate()
    const context = useContext(orderContext);
    
    const { order, addOrder,getOrder} = context;
  
    useEffect(() => {
      
      const email = localStorage.getItem('email');
      if ( localStorage.getItem('userAuthToken')) {
        getOrder(email);
      } else {
        
        navigate('/login');
      }
    }, [])

    console.log(order)
    return (
        <>
         <h1 className='text-4xl font-bold text-center mt-20 ' >Your Order History</h1>
          <hr className='ml-[41%] w-60 bg-green-600 h-[2px]' />
         {Array.isArray(order) && order.length > 0 ? (
          order.map((ord) => {
            return (
                <OrderCard order_detail={ord} />
          
            );
          })
        ) : (
          <p>No orders available</p>
        )}
        </>
        
    );
}