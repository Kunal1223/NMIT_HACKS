import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardN(props) {
  let { name, manager_name, desc, social_link, imageUrl } = props.ngo_detail;

  const Navigate = useNavigate();

  const moveToCard = (e) => {
    e.preventDefault();
    Navigate('/particular', { state: { ngoDetail: props.ngo_detail } });
  }
  

  return (
    <div className="" onClick={moveToCard} >
      <div className=" mx-2 my-5  mt-11 w-72 transform overflow-hidden rounded-lg   shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
        <img className="h-48 w-full object-cover object-center " src={imageUrl} alt="event1" />
        <div className="p-4">


          <div className=" py-2">
            <div className="font-bold text-xl ">{name}</div>
          </div>


          <div className="  pb-2 flex align-bottom text-[#0000006d] leading-normal text-[14px] font-normal font-[Roboto] ">
            Description: {desc}
          </div>
          
          <div className=" py-4 flex justify-between">
            <div className="font-bold  "><span className="">Manager: </span>{manager_name}</div>

            <div className="">

              <a href={social_link}>  <i className="fa-brands fa-instagram mr-2"></i></a>
              <i className="fa-regular fa-envelope mr-2"></i>
              <i className="fa-solid fa-phone "></i>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
}


