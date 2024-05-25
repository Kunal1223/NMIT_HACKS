import React, { useState,useContext ,useEffect } from 'react';
import orderContext from "../context/Order/orderContext";
import { useLocation ,useNavigate} from 'react-router-dom';
import ResOrderCard from './ResOrderCard';

export default function ResOrder() {
    const location = useLocation();
    const navigate=useNavigate()
    const context = useContext(orderContext);
    
    const { order, getOrderByres,getOrder} = context;
  
    useEffect(() => {
      
      const email = localStorage.getItem('email');
      if ( localStorage.getItem('restroAuthToken')) {
        getOrderByres(email);
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
                <ResOrderCard order_detail={ord} />
          
            );
          })
        ) : (
          <p>No orders available</p>
        )}
        </>
        
    );
}