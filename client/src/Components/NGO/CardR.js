import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardR(props) {
  let { name, manager_name, desc, social_link, Veg, Nonveg, imageUrl, email } =
    props.res_detail;
  const Navigate = useNavigate();

  const [VegN, setVegN] = useState(Veg);
  const [NonVegN, setNonVegN] = useState(Nonveg);
  const userAuthToken1 = localStorage.getItem("userAuthToken");
  console.log(userAuthToken1);

  const moveToCard = (e) => {

    e.preventDefault();
    
    if(!localStorage.getItem('ngoAuthToken'))
    Navigate("/particularres", { state: { resDetail: props.res_detail } });
  };

  const decline = () => {
    setVegN(0);
    setNonVegN(0);
  };
  const accept = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/res/packets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Veg: 0, Nonveg: 0, email: email }),
    });
    if (response.ok) {
      // Handle successful response
      window.location.reload();
    } else {
      // Handle error response
      console.error("Failed to update packets");
    }
  };

  return (
    <div className="">
      <div

        onClick={moveToCard}
        className=" mx-5 my-5  mt-11 w-72 transform overflow-hidden rounded-lg   shadow-lg duration-300 hover:scale-105 hover:shadow-lg"
      >
        <img
          className="h-48 w-full object-cover object-center "
          src={imageUrl}
          alt="event1"
        />
        <div className="p-3">
          <div className=" py-2">
            <div className="font-bold text-xl ">{name}</div>
          </div>

          <div className="  pb-2 flex align-bottom text-[#0000006d] leading-normal text-[14px] font-normal font-[Roboto] ">
            Description: {desc}
          </div>

          <div className=" pt-4 ">
            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Veg
            </span>

            <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Non-Veg
            </span>
          </div>
          <div className=" py-2 flex justify-between">
            <div className="font-bold  ">
              <span className="">Manager: </span>
              {manager_name}
            </div>
            <div className="">
              <a href={social_link}>
                {" "}
                <i className="fa-brands fa-instagram mr-2"></i>
              </a>
              <i className="fa-regular fa-envelope mr-2"></i>
              <i className="fa-solid fa-phone "></i>
            </div>
          </div>

          <div className="packets my-2">
            <button className="bg-[#f3f1f1] px-2 py-1 rounded-md text-gray-800 font-semibold">
              Donate Packets : <span className="ml-4">{Nonveg} </span>
              <i class="fa-solid fa-circle text-red-500 mr-4 "></i>
              {Veg} <i class="fa-solid fa-circle text-green-500 mr-4"></i>
            </button>
          </div>


        
          {((!localStorage.getItem('userAuthToken')) && (VegN > 0 || NonVegN > 0 )) ? (
            <div className="p-3 ">
              <button
                onClick={accept}
                className=" mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Decline
              </button>
            </div>
          ) : (
            <></>
          )}
         
        

        </div>
      </div>
    </div>
  );
}

// line-height: normal;
