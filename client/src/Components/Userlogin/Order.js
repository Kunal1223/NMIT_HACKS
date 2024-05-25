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