import React, { useState, useContext, useEffect } from "react";
import orderContext from "../context/Order/orderContext";
import { useLocation } from "react-router-dom";

export default function OrderCard(props) {
  const order_detail = props.order_detail;

  const orderDate = new Date(order_detail.date);

  // Format the date using toLocaleDateString or other formatting functions
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  //calculate price
 

  return (
    <>
      <div>
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:{" "}
                    <span className="text-indigo-600 font-medium">
                      {order_detail._id}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Order Payment Date :{" "}
                    <span className="text-gray-400 font-medium">
                      {formattedDate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-3 min-[400px]:px-6">
                <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div className="img-box max-lg:w-full">
                    {/* <img src={imageUrl} alt="Restaurant" className="aspect-square w-full lg:max-w-[140px]" /> */}
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div>
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                            {order_detail.Restro}
                          </h2>

                          <div className="flex items-center">
                            <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              Vegetarian Packets:{" "}
                              <span className="text-gray-500">
                                {order_detail.VegPackets}
                              </span>
                            </p>
                            <p className="font-medium text-base leading-7 text-black">
                              Non-Vegetarian Packets:{" "}
                              <span className="text-gray-500">
                                {order_detail.NonVngPackets}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              Price
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              {/* {order_detail.NonVegPacketsType} */}
                              RS. {order_detail.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black mx-2">
                              Status
                            </p>
                            <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              {order_detail.status}
                            </p>
                            
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </>
  );
}
