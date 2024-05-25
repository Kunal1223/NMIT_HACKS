import OrderContext from './orderContext'
import { useState } from 'react'

export default function OrderState(props) {
  const host = 'http://localhost:5000'
  const orderInitial = []

  const [order, setOrder] = useState(orderInitial)
 
//get order detail using res email
  const getOrderByres = async (email) => {
    
    try {
      const response = await fetch(`${host}/api/auth/res/fetchallorders?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("userAuthToken"),
        },
      });

      if (response.ok) {
        console.error("Failed to fetch orders");
      }
      const json = await response.json();
      
      setOrder(json);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      // Handle error, e.g., display a message to the user
    }
  };


 //Search order using user email
  const getOrder = async (email) => {
    
    try {
      const response = await fetch(`${host}/api/auth/user/fetchallorders?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("userAuthToken"),
        },
      });

      if (response.ok) {
        console.error("Failed to fetch orders");
      }
      const json = await response.json();
      
      setOrder(json);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      // Handle error, e.g., display a message to the user
    }
  };
  
  const addOrder = async (Restro, userEmail, VegPackets, VegPacketsType, NonVegPacketsType, NonVngPackets, Messege ,resEmail,totalPrice) => {

    
    const response = await fetch(`${host}/api/auth/user/addorder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ Restro, userEmail, VegPackets, VegPacketsType, NonVegPacketsType, NonVngPackets, Messege,resEmail ,totalPrice})
    });
    const json = await response.json();
    console.log(json)
    const newOrder = {
        "_id": "652000b85d79fc3d1b655f1y",
        "user": "651fff175d79fc3d1b655f18",
        "Restro": Restro,
        "Messege": Messege,
        "VegPackets": VegPackets,
        "NonVngPackets": NonVngPackets,
        "VegPacketsType": VegPacketsType,
        "NonVegPacketsType": NonVegPacketsType,
        "userEmail": userEmail,
        "resEmail":resEmail,
        "price":totalPrice,
        
        "date": "2023-10-06T12:42:32.253Z",
        "__v": 0
    };

    setOrder(newOrder); // Simply set the new order object
};


  //Edit a note
  // const editOrder = async (id, status) => {


  //   // Default options are marked with *
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
        


  //     },

  //     body: JSON.stringify({ status }),
  //   });
  //   const json = response.json();
  //   console.log(json)


  //   // for (let index = 0; index < notes.length; index++) {
  //   //   const element = notes[index];
  //   //   if (element._id === id) {
  //   //     element.title = title;
  //   //     element.description = description;
  //   //     element.tag = tag;
  //   //   }
  //   // }

  // }


  return (
    <OrderContext.Provider value={{ order, setOrder, addOrder,getOrder,getOrderByres }}>
      {props.children},
    </OrderContext.Provider>
  )
}