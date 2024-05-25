import OrderContext from './orderContext'
import { useState } from 'react'

export default function OrderState(props) {
  const host = 'http://localhost:5000'
  const orderInitial = []

  const [order, setOrder] = useState(orderInitial)
 
 
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
  
  const addOrder= async ( Restro, VegPackets, NonVngPackets, Messege ) => {
    const response = await fetch(`${host}/api/auth/user/addorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')


      },

      body: JSON.stringify({ Restro, VegPackets, NonVngPackets, Messege  }),
    });
    const json = response.json();

    const order = {
      "_id": "652000b85d79fc3d1b655f1y",
      "user": "651fff175d79fc3d1b655f18",
      "Restro": Restro,
      "Messege":Messege,
      "VegPackets": VegPackets,
      "NonVngPackets": NonVngPackets,
      "date": "2023-10-06T12:42:32.253Z",
      "__v": 0
    };
    setOrder(order.concat(order))
  }

  
 


  //Edit a note
//   const editNote = async (id, title, description, tag) => {


//     // Default options are marked with *
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         'auth-token': localStorage.getItem('token')


//       },

//       body: JSON.stringify({ title, description, tag }),
//     });
//     const json = response.json();



//     for (let index = 0; index < notes.length; index++) {
//       const element = notes[index];
//       if (element._id === id) {
//         element.title = title;
//         element.description = description;
//         element.tag = tag;
//       }
//     }

//   }


  return (
    <OrderContext.Provider value={{ order, setOrder, addOrder,getOrder }}>
      {props.children}
    </OrderContext.Provider>
  )
}